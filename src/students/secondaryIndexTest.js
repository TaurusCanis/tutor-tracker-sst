import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      studentId: event.pathParameters.id,
    },
  };

  const result = await dynamoDb.get(params);
  if(!result.Item) {
    throw new Error("Student not found.");
  }

  return result.Item;
});
