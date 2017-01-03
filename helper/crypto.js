"use strict";

var crypto = require("crypto-js");
var md5 = require('crypto-js/md5');
var sha256 = require("crypto-js/sha256");
var helper = {};

function generatePassword(password) {
    var salt = crypto.lib.WordArray.random(128 / 8);
    var saltDigitCodeHash = salt.toString(crypto.enc.Base64);
    var digit = md5(password, saltDigitCodeHash);
    var digitCodeHash = digit.toString(crypto.enc.Base64);

    return {
        saltDigitCodeHash: saltDigitCodeHash,
        digitCodeHash: digitCodeHash
    };
}
// generate device token
function generateDeviceToken(barcode) {
    var salt = crypto.lib.WordArray.random(256 / 8);
    var saltDigitCodeHash = salt.toString(crypto.enc.Base64);
    var token = sha256(saltDigitCodeHash);
    var tokenCodeHash = token.toString(crypto.enc.Base64);

    return {
        token: tokenCodeHash,
        uuid: saltDigitCodeHash
    };
};
function generatePasswordBySaltDigitCodeHash(password, saltDigitCodeHash) {
    var digit = md5(password, saltDigitCodeHash);
    var digitCodeHash = digit.toString(crypto.enc.Base64);

    return {
        digitCodeHash: digitCodeHash
    };
}

function generateToken() {
    var salt = crypto.lib.WordArray.random(256 / 8);
    var saltDigitCodeHash = salt.toString(crypto.enc.Base64);
    var token = sha256(saltDigitCodeHash);
    var tokenCodeHash = token.toString(crypto.enc.Base64);

    return {
        token: tokenCodeHash
    };
};

function getTokenFromReqHeader(authorization) {
    var arrTemp = authorization.split(' ');
    var token = decodeURIComponent(arrTemp[1]);

    return token;
}
helper.generateDeviceToken = generateDeviceToken;
helper.generatePassword = generatePassword;
helper.generatePasswordBySaltDigitCodeHash = generatePasswordBySaltDigitCodeHash;
helper.generateToken = generateToken;
helper.getTokenFromReqHeader = getTokenFromReqHeader;

module.exports = helper;