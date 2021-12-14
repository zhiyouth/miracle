import { PARAM_TYPE } from "../../constant";
import throwError from "../../error";
import judgeParamType from "./judgeParamType";

export default function judgeObjectParamType(param: any, errorMsg?: string): boolean {
  const typeString = judgeParamType(param);
  const isEqual = typeString === PARAM_TYPE.Object;
  if (!isEqual && errorMsg) {
    throwError(errorMsg);
  }
  return isEqual;
}