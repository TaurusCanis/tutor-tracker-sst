export default function handler(lambda) {
  return async function(event, context) {
    let body, statusCode;

    try {
      body = await lambda(event, context);
      200;
    } catch (e) {
      console.error(e);
      body = { error: e.message };
      500;
    }
    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  };
}
