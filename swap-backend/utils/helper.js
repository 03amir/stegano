const crypto = require("crypto");

exports.getRandomFileName = (byte=32) =>{
    return crypto.randomBytes(byte).toString("hex");
}