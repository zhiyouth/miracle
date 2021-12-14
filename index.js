'use strict';

// Object.prototype.toString.call(num),  // '[object Number]'
// Object.prototype.toString.call(str),  // '[object String]'
// Object.prototype.toString.call(bool),  // '[object Boolean]'
// Object.prototype.toString.call(arr),  // '[object Array]'
// Object.prototype.toString.call(obj),  // '[object Object]'
// Object.prototype.toString.call(func),  // '[object Function]'
// Object.prototype.toString.call(und),  // '[object Undefined]'
// Object.prototype.toString.call(nul),  // '[object Null]'
// Object.prototype.toString.call(date),  // '[object Date]'
// Object.prototype.toString.call(reg),  // '[object RegExp]'
// Object.prototype.toString.call(error)  // '[object Error]'
var PARAM_TYPE;
(function (PARAM_TYPE) {
    PARAM_TYPE["Number"] = "[object Number]";
    PARAM_TYPE["String"] = "[object String]";
    PARAM_TYPE["Boolean"] = "[object Boolean]";
    PARAM_TYPE["Array"] = "[object Array]";
    PARAM_TYPE["Object"] = "[object Object]";
    PARAM_TYPE["Function"] = "[object Function]";
    PARAM_TYPE["Undefined"] = "[object Undefined]";
    PARAM_TYPE["Null"] = "[object Null]";
    PARAM_TYPE["Date"] = "[object Date]";
    PARAM_TYPE["RegExp"] = "[object RegExp]";
    PARAM_TYPE["Error"] = "[object Error]";
})(PARAM_TYPE || (PARAM_TYPE = {}));

function judgeParamType(param) {
    return Object.prototype.toString.call(param);
}

function judgeArrayParamType(param, errorMsg) {
    var typeString = judgeParamType(param);
    var isEqual = typeString === PARAM_TYPE.Array;
    return isEqual;
}

function judgeObjectParamType(param, errorMsg) {
    var typeString = judgeParamType(param);
    var isEqual = typeString === PARAM_TYPE.Object;
    return isEqual;
}

function filterUndefinedParam(obj, filter) {
    var overrideRules = null;
    var ignoredKeys = null;
    var excludeKeyValues = null;
    var existIgnoreKeys = false;
    var existOverrideRules = false;
    var existExcludeKeyValues = false;
    if (!judgeObjectParamType(obj)) ;
    if (filter) {
        if (!judgeObjectParamType(filter)) ;
        var inputIgnoredKeys = filter.ignoredKeys, inputOverrideRules = filter.overrideRules, inputExcludeKeyValues = filter.excludeKeyValues;
        // if git ignoredKeys, continue
        if (inputIgnoredKeys && judgeArrayParamType(inputIgnoredKeys) && inputIgnoredKeys.length) {
            ignoredKeys = inputIgnoredKeys;
            existIgnoreKeys = true;
        }
        if (inputOverrideRules && judgeArrayParamType(inputOverrideRules) && inputOverrideRules.length) {
            overrideRules = inputOverrideRules;
            existOverrideRules = true;
        }
        if (inputExcludeKeyValues && judgeObjectParamType(inputExcludeKeyValues) && Object.keys(inputExcludeKeyValues).length) {
            excludeKeyValues = inputExcludeKeyValues;
            existExcludeKeyValues = true;
        }
        console.log(excludeKeyValues, 'excludeKeyValuesexcludeKeyValues');
    }
    var keyParams = Object.keys(obj);
    for (var keyIndex = 0; keyIndex < keyParams.length; keyIndex++) {
        var skip = false;
        var key = keyParams[keyIndex];
        var value = obj[key];
        // if git ignoredKeys, continue
        labelExistIgnoreKeys: if (existIgnoreKeys && ignoredKeys) {
            for (var i = 0; i < ignoredKeys.length; i++) {
                if (key === ignoredKeys[i]) {
                    skip = true;
                    break labelExistIgnoreKeys;
                }
            }
        }
        lableExistExcludeKeyValues: if (existExcludeKeyValues && excludeKeyValues) {
            var eKeys = Object.keys(excludeKeyValues);
            for (var k = 0; k < eKeys.length; k++) {
                var eKey = eKeys[k];
                var eValue = excludeKeyValues[eKey];
                if (key === eKey && value === eValue) {
                    skip = true;
                    break lableExistExcludeKeyValues;
                }
            }
        }
        if (!skip) {
            if (existOverrideRules && overrideRules) {
                for (var j = 0; j < overrideRules.length; j++) {
                    if (value === overrideRules[j]) {
                        delete obj[key];
                    }
                }
            }
            else {
                if (!value) {
                    delete obj[key];
                }
            }
        }
    }
    return obj;
}

var index = {
    filterUndefinedParam: filterUndefinedParam,
};

module.exports = index;
