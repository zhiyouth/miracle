import throwError from "../../error";
import judgeArrayParamType from "../judge/judgeArrayParamType";
import judgeObjectParamType from "../judge/judgeObjectParamType";

type BaseType = Number | String | Boolean | undefined | null;
type ExcludeKeyValuesType = {key: string, value: BaseType};

type FilterType = {
  ignoredKeys?: String[];
  overrideRules?: BaseType[];
  excludeKeyValues?: ExcludeKeyValuesType;
}

export default function filterUndefinedParam(obj: Object, filter?: FilterType): Object {
  let overrideRules = null as BaseType[];
  let ignoredKeys = null as String[];
  let excludeKeyValues = null as ExcludeKeyValuesType;
  let existIgnoreKeys = false;
  let existOverrideRules = false;
  let existExcludeKeyValues = false;
  if (!judgeObjectParamType(obj)) {
    throwError('param should be Object');
  }
  if (filter) {
    if (!judgeObjectParamType(filter)) {
      throwError('filter should be Object');
    }
    const { ignoredKeys: inputIgnoredKeys, overrideRules: inputOverrideRules, excludeKeyValues: inputExcludeKeyValues } = filter;
    
    // if git ignoredKeys, continue
    if (judgeArrayParamType(inputIgnoredKeys) && inputIgnoredKeys.length) {
      ignoredKeys = inputIgnoredKeys;
      existIgnoreKeys = true;
    }
    if (judgeArrayParamType(inputOverrideRules) && inputOverrideRules.length) {
      overrideRules = inputOverrideRules;
      existOverrideRules = true;
    }
    if (judgeObjectParamType(inputExcludeKeyValues) && Object.keys(inputExcludeKeyValues).length) {
      excludeKeyValues = inputExcludeKeyValues
      existExcludeKeyValues = true;
    }
    console.log(excludeKeyValues, 'excludeKeyValuesexcludeKeyValues')

  }
  const keyParams = Object.keys(obj);
  for(let keyIndex = 0; keyIndex < keyParams.length; keyIndex++) {
    let skip = false;
    const key = keyParams[keyIndex];
    const value = obj[key];

    // if git ignoredKeys, continue
    labelExistIgnoreKeys: if (existIgnoreKeys) {
      for (let i = 0; i < ignoredKeys.length; i++) {
        if (key === ignoredKeys[i]) {
          skip = true;
          break labelExistIgnoreKeys;
        }
      }
    }

    lableExistExcludeKeyValues: if (existExcludeKeyValues) {
      const eKeys = Object.keys(excludeKeyValues);
      for( let k = 0; k < eKeys.length; k++) {
        const eKey = eKeys[k];
        const eValue = excludeKeyValues[eKey];
        if (key === eKey && value === eValue) {
          skip = true;
          break lableExistExcludeKeyValues;
        }
      }
    }
    if (!skip) {
      if (existOverrideRules) {
        for (let j = 0; j < overrideRules.length; j++) {
          if (value === overrideRules[j]) {
            delete obj[key];
          }
        }
      } else {
        if (!value) {
          delete obj[key];
        }
      }
    }
  }
  return obj;
}