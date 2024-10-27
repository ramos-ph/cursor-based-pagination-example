const PREFIX = "cursor_";

exports.encode = (text) => {
  return Buffer.from(PREFIX + text, "utf-8").toString("base64");
};

exports.decode = (cursor) => {
  return Buffer.from(cursor, "base64").toString("utf-8").replace(PREFIX, "");
};
