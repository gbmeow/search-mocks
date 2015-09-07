/**
 * Created by jerzybatalinski on 2015-09-07.
 */

var expect = require('chai').expect;
var Matcher = require('./test-code.js');

describe("validation", function() {
    var matcher;

    beforeEach(function () {
        matcher = new Matcher();
    });

    it("should find a Number pattern in a string", function () {

        var patterns = {
            position: {type: 'number', pattern: /[1-9][0-9]*|0/},
            refBase: {type:'string', pattern: /[a-zA-Z]*/},
            altBase: {type: 'string', pattern: /[a-zA-Z]*/}
        }
        var userSearch = 'A 10000 Tennis'.split(' ');
        var result = matcher.findMatches(userSearch, patterns);

        expect(result).to.have.deep.property('position', '10000');
    });


});