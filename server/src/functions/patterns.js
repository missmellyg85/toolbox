import data from "./data.json";

const ALLOWED_ORIGINS = [
  "http://localhost:8081",
  "https://sad-varahamihira-696b0e.netlify.app",
];

exports.handler = (event, context, callback) => {
  console.log(event);
  let headers = {};
  const allowed_origin = ALLOWED_ORIGINS.find(
    (origin) => origin === event.headers.origin
  );
  if (allowed_origin) {
    headers = { ...headers, "Access-Control-Allow-Origin": allowed_origin };
  }
  return callback(null, {
    statusCode: 200,
    headers,
    body: JSON.stringify(data),
  });
};
