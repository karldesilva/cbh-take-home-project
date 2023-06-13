const crypto = require("crypto");

const encryptKey = (partitionKey) => {
  return crypto.createHash("sha3-512").update(partitionKey).digest("hex");
};

const formatKey = (partitionKey) => {
  const MAX_KEY_LENGTH = 256;

  if (typeof partitionKey !== "string") {
    partitionKey = JSON.stringify(partitionKey);
  }

  if (partitionKey.length > MAX_KEY_LENGTH) {
    return encryptKey(partitionKey);
  }

  return partitionKey;
};

exports.deterministicPartitionKey = (event) => {
  const DEFAULT_KEY = "0";

  if (!event) return DEFAULT_KEY;

  if (event.partitionKey) return formatKey(event.partitionKey, DEFAULT_KEY);

  return encryptKey(JSON.stringify(event));
};
