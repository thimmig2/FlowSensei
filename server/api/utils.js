/**s
 * Fetches a unique id for the table
 * callback(error, id)
 */
exports.unique_id = function(table_name, callback) {
    dynamo.getItem({
        TableName: "unique_ids",
        Key: {
            table_name: table_name
        }
    }, function(error, data) {
        if(error) {
            callback(error);
        } else if("Item" in data) {
            var last_id = data.Item.last_id
            var new_id = last_id + 1;
            var conditional_put_params = {
                TableName: 'unique_ids',
                Key: {
                    table_name:  table_name
                },
                UpdateExpression: "SET last_id = :new_id",
                ConditionExpression: "last_id = :last_id" ,
                ExpressionAttributeValues: {
                    ":last_id": last_id,
                    ":new_id": new_id
                }
            };
            dynamo.updateItem(conditional_put_params, function(error, data) {
                if(error) {
                    callback(error);
                } else {
                    callback(null, new_id);
                }
            });
        } else { // the counter for this table has not been created yet, create the entry and start the count at 0
            new_table_parms = {
                TableName: 'unique_ids',
                Item: {
                    table_name:  table_name,
                    last_id: 0
                }
            };
            dynamo.putItem(new_table_parms, function(error, data) {
                if(error) {
                    callback(error);
                } else {
                    callback(null, 0);
                }
            });        
        }
    });        
}