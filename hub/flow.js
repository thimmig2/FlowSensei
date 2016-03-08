
console.log('Loading...');
var fs = require('fs');
var GPIO = require('onoff').Gpio;
var flow_sensor = new GPIO(4, 'in', 'both');

var pour_ticks = 0,
    flow_rate_ticks = 0,
    flow_rate_update_intervale = 0.5; // s
pour_begin_time = null,
finished_delay = 1, //s (how long to wait to know if we're done with a pour)
finished_interval = null,
total_dispensed = 0, // L
sensor_rate = 18; // (Hz) = 7.5 * Flow rate (L/min)


function output_flow_rate() {
    if (flow_rate_ticks > 0) {
        var flow_rate = flow_rate_ticks / (sensor_rate * flow_rate_update_intervale);
        console.log("Flowing at %sL/min", flow_rate);
        flow_rate_ticks = 0
    } else {
        // console.log("Not flowing, total dispensed: %sL", total_dispensed);
    }
}

function pour_complete() {
    var pour_duration = (last_tick_time - pour_begin_time) / 1000; // in seconds
    console.log("%s Ticks Occured in %ss", pour_ticks, pour_duration);
    var pour_total = pour_ticks / (sensor_rate * 60);
    total_dispensed += pour_total;
    console.log("Finished %sL pour in %ss!", pour_total, pour_duration);
    report_flow({
    	total_dispensed: pour_total,
    	duration: pour_duration,
    	timestamp: new Date()
    });

    cleanup_pour_variables();
}

function report_flow(info) {
	fs.appendFile('output.txt', JSON.stringify(info));
    // // Build the post string from an object
    // var post_data = querystring.stringify({
    //     'compilation_level': 'ADVANCED_OPTIMIZATIONS',
    //     'output_format': 'json',
    //     'output_info': 'compiled_code',
    //     'warning_level': 'QUIET',
    //     'js_code': codestring
    // });

    // // An object of options to indicate where to post to
    // var post_options = {
    //     host: 'closure-compiler.appspot.com',
    //     port: '80',
    //     path: '/compile',
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded',
    //         'Content-Length': Buffer.byteLength(post_data)
    //     }
    // };

    // // Set up the request
    // var post_req = http.request(post_options, function(res) {
    //     res.setEncoding('utf8');
    //     res.on('data', function(chunk) {
    //         console.log('Response: ' + chunk);
    //     });
    // });

    // // post the data
    // post_req.write(post_data);
    // post_req.end();
}

// define the callback function
function handle_flow(err, state) {
    if (err) {
        throw err;
    } else if (state == 1) {
        if (pour_begin_time == null) {
            pour_begin_time = new Date();
        }
        last_tick_time = new Date();

        pour_ticks += 1;
        flow_rate_ticks += 1;
        schedule_pour_complete();
    }
}

function cleanup_pour_variables() {
    clearInterval(finished_interval);
    finished_interval = null
    pour_begin_time = null;
    pour_ticks = 0;
}

function schedule_pour_complete() {
    if (finished_interval) {
        clearInterval(finished_interval);
    }
    finished_interval = setInterval(pour_complete, finished_delay * 1000);
}

// pass the callback function to the
// as the first argument to watch()
flow_sensor.watch(handle_flow);
setInterval(output_flow_rate, flow_rate_update_intervale * 1000);
// simulate_flow();


function exit() {
    console.log('Cleaning up...');
    flow_sensor.unexport();
    process.exit();
}
process.on('SIGINT', exit);

console.log('Complete!');
