import data from "./data.json";

const ALLOWED_ORIGINS = [
  "http://localhost:8081",
  "https://sad-varahamihira-696b0e.netlify.com"
];

exports.handler = (event, context, callback) => {
  console.log("event", event);
  console.log("context:", context);
  const allowed_origin = ALLOWED_ORIGINS.find(
    origin => origin === event.headers.origin
  );
  return callback(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": allowed_origin
    },
    body: JSON.stringify(data)
  });
};
