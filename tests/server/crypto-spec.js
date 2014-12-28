var aes = require('aes-helper');
var expect = require("chai").expect;

describe('crypto', function() {

    var PRIVATE_PASSWORD;

    before(function () {
         PRIVATE_PASSWORD = process.env.PRIVATE_PASSWORD;
    });

    it('PRIVATE_PASSWORD should not be empty', function () {
        expect(PRIVATE_PASSWORD.length).to.be.at.least(1);
    });

    it('decrypted password must match', function () {
        expect(aes.decrypt("5a3d2c30943aa02691ab88f3ad70f964", PRIVATE_PASSWORD)).to.equal('test');
    });
});
