

exports.handler = function(event, context){

	// context.succeed({hub: 'hub handler called'});


	console.log("Calling %s", event.method);
	switch (event.method) {
        case 'PUT':
			hubId = registerHub(event.method);
			context.succeed({id: hubId});
            break;
        case 'GET':
            params.Key = event.queryParams
            dynamo.getItem(params, context.done);
            break;
        case 'POST':
            params.Key = {
                id: event.body.id    
            };
            delete event.body.id
            params.Item = event.body;
            console.log("Creating: %s", params);
            dynamo.updateItem(params, context.done);
            break;
        case 'DELETE':
            dynamo.deleteItem(event.payload, context.done);
            break;
        case 'list':
            dynamo.scan(event.payload, context.done);
            break;
        default:
            context.fail(new Error('Unrecognized operation "' + operation + '"'));
    }

}

/**
 * @param registrationCode {Number}
 * @returns {Number} hubId
 */
function registerHub(registrationCode) {
	console.log("Registering hub: %s", registrationCode);
	return registrationCode;
} 