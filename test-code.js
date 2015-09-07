/**
 * Created by jerzybatalinski on 2015-09-07.
 */

var _ = require('lodash');

function Matcher() {

}

Matcher.prototype.findMatches = function(values, patterns) {

    var keys = _.keys(patterns);
    var result = [];
    _.forEach(keys, function(ke) {
        var regex = patterns[ke].pattern;
        _.forEach(values, function(value) {
            if (regex.test(value)) {
                result.push({key: ke, value: value});
                return false;
            }
        });
    });
    var processed = {};
    _.forEach(result, function(item, key) {
        processed[item.key] = item.value;
    });
    return processed;
}

module.exports = Matcher;