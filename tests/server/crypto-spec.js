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
        expect(aes.decrypt("59d2d8a10df3532054600705c44cd86f", PRIVATE_PASSWORD)).to.equal('test');
    });
});
