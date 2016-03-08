console.log('Loading function');

var doc = require('dynamodb-doc');
var dynamo = new doc.DynamoDB();

var utils = require('./utils.js');
var hub =   require('./handlers/hub.js');

var mapper = {
    "/hub": hub
};

/**
 * Provide an event that contains the following keys:
 *
 *   - operation: one of the operations in the switch statement below
 *   - tableName: required for operations that interact with DynamoDB
 *   - payload: a parameter to pass to the operation being performed
 */
exports.handler = function(event, context) {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    var resource = event.resource
    if(resource in mapper) {
        mapper[resource].handler(event, context);
    } else {
        context.fail(new Error("Unrecognized resource: %s", resource));
    }

    // context.fail(new Error("Unhandled Execution"));
};