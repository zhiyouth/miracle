import { PARAM_TYPE } from "../../constant";
import throwError from "../../error";
import judgeParamType from "./judgeParamType";

export default function judgeBooleanParamType(param: any, errorMsg?: string): boolean {
  const typeString = judgeParamType(param);

  const isEqual = typeString === PARAM_TYPE.Boolean;
  if (!isEqual && errorMsg) {
    throwError(errorMsg);
  }
  return isEqual;
}