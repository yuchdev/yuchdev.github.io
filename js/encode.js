#!/usr/bin/env node
/**
 * Simple Node.js script to encode a string to Base64.
 * Usage: node encode.js <secret>
 */
const secret = process.argv[2];

if (!secret) {
  console.error("Usage: node encode.js <secret>");
  process.exit(1);
}

const encoded = Buffer.from(secret, "utf8").toString("base64");
console.log(encoded);
