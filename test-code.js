/**
 * Created by jerzybatalinski on 2015-09-07.
 */

var _ = require('lodash');

function Matcher() {

}

Matcher.prototype.findMatches = function(values, patterns) {

    var keys = _.keys(patterns);
    var regexes = _.values(patterns);

    var result = {};
    _.forEach(keys, function(ke, idx) {
        var regex = regexes[idx].pattern;
        if (regex.test(values[idx]))
            result[ke] = values[idx];

    });
    return result;

}

module.exports = Matcher;