import { PARAM_TYPE } from "../../constant";
import throwError from "../../error";
import judgeParamType from "./judgeParamType";

export default function judgeErrorParamType(param: any, errorMsg): boolean {
  const typeString = judgeParamType(param);
  const isEqual = typeString === PARAM_TYPE.Error;
  if (!isEqual && errorMsg) {
    throwError(errorMsg);
  }
  return isEqual;
}