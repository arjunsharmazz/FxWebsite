
const crypto = require("crypto");

const ALGORITHM = "aes-256-cbc";
const KEY = Buffer.from(process.env.AES_KEY || "", "utf8"); // 32 bytes for aes-256
const IV = Buffer.from(process.env.AES_IV || "", "utf8"); // 16 bytes

function encrypt(text) {
  if (!KEY.length || !IV.length) throw new Error("AES_KEY/AES_IV not configured");
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decrypt(enc) {
  if (!KEY.length || !IV.length) throw new Error("AES_KEY/AES_IV not configured");
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, IV);
  let decrypted = decipher.update(enc, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = { encrypt, decrypt };
