import "react-native-get-random-values"; //only needed for react native
import "react-native-url-polyfill/auto"; // only needed for react native

const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const { fromCognitoIdentityPool } = require("@aws-sdk/credential-provider-cognito-identity");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
import { QueryCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const REGION = "{REGION}";
const IDENTITY_POOL_ID = "{IDENTITY_POOL_ID}";

(async () => {

  // create an Amazon DynamoDB service client object.
  const dynamoClient = new DynamoDBClient({
    region: REGION,
    credentials: fromCognitoIdentityPool({
      client: new CognitoIdentityClient({ region: REGION }),
      identityPoolId: IDENTITY_POOL_ID,
    }),
  });
  
  // put hello world in the db
  const putParams = {
    TableName: 'myTable',
    Item: {
      id: 0,
      name: 'myName',
      json : {
        myJson : { myKey : 'hello, world!'}
      }
    }
  };
  await dynamoClient.send(new PutCommand(putParams));
  
  // get hello world from the db
  const getParams = {
    TableName: 'myTable',
    ExpressionAttributeNames : {
      '#name' : 'name'
    },
    ExpressionAttributeValues: {
      ':id' : 0,
      ':name' : 'myN'
    },
    KeyConditionExpression : 'id = :id',
    FilterExpression :  'begins_with(#name, :name)'
  };
  const data = await dynamoClient.send(new QueryCommand(getParams));
  
  //print hello world!
  console.info(data.Items[0].json.myJson.myKey)l
  
})();

