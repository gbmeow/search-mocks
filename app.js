/**
 * Created by jerzybatalinski on 2015-09-07.
 */

var app = angular.module('searchFriend', []);

app.controller('MainCtrl', function() {

});

app.directive('searchField', function() {
    return {
        restrict: 'E',
        templateUrl: 'search-field.html',
        controller: ['ValidateParams', function(ValidateParams) {
            var vm = this;
            vm.userInput = '';
            vm.parse = function() {
                if (vm.userInput) {
                    parseValues(vm.userInput);
                }
            }

            function parseValues(values) {
                var patterns = {
                    position: {type: 'number', pattern: /[1-9][0-9]*|0/},
                    refBase: {type:'string', pattern: /A-Z/},
                    altBase: {type: 'string', pattern: /A-Z/}
                }

                var result = findMatches(values.split(' '), patterns);

                if (result) {

                    vm.parsed = {
                        position: result.position || 'e.g.1000',
                        refBase: result.refBase || 'A',
                        altBase: result.altBase || 'C'
                    }

                }

            }


            function findMatches(values, patterns) {

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


        }],
        controllerAs: 'ctrl'
    }

});


app.service('ValidateParams', Validator);

function Validator() {

    function Validator(obj) {
        this.params = obj;
    }

    var parseValue = function(value, type) {
        if (type === 'string') return value;
        if (type === 'number') return Number(value);
    }

    var validationErrorMessages = {
        'type': function(key, value) {
            return 'Type is invalid';
        },
        'required': 'Type is required'
    }

    var checkIsType = function(value, type, desc) {
        if (!type) return;
        var key = desc.key,
            isRequired = desc.isRequired;

        var typeIsValid = typeof value === type,
            typeIsUndefined = typeof value === 'undefined';

        //TODO: This is excellent - returning the type that they should have typed
        if (isRequired)
            if (!typeIsValid)
                return "Not valid type. Please try again with type " + type;
            else
            //TODO Why are we returning 2 errors
            //TODO - seems like this validationErrorMessages never get consumed on
            //TODO - line: 80
            if (!typeIsUndefined && typeIsValid)
                return validationErrorMessages;


    }
    var checkIsPresent = function(value, desc) {
        //TODO - We are checking isRequired in checkIsPresent && checkIsType
        var isRequired = desc.required || false;

        if (isRequired)
            if (!value || value === '')
                return 'Required parameter is not present';
    }

        Validator.prototype.validate = function(collection) {
            var flagged = [];
            var optionsKeys = Object.keys(this.params);

            var that = this;
            optionsKeys.forEach(function(key, idx) {
                var desc = that.params[key];
                desc._key = key;
                var value = collection[key];

                if (!desc) return;

                var parsed = parseValue(value, desc.type);

                var presentErrors = checkIsPresent(parsed, desc);

                if (presentErrors) {
                    flagged.push({key: key, message: presentErrors});
                    return false;
                }


                // can only check for the following if there is a value
                var typeErrors = checkIsType(parsed, desc.type, desc);
                if (typeErrors) {
                    flagged.push({key: key, message: typeErrors});
                    return false;
                }


            });
            return flagged;
        };

    return Validator;
}




