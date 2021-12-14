import { PARAM_TYPE } from "../../constant";
import throwError from "../../error";
import judgeParamType from "./judgeParamType";

export default function judgeRegExpParamType(param: any, errorMsg?: string): boolean {
  const typeString = judgeParamType(param);
  const isEqual = typeString === PARAM_TYPE.RegExp;
  if (!isEqual && errorMsg) {
    throwError(errorMsg);
  }
  return isEqual;
}