import { PARAM_TYPE } from "../../constant";

export default function judgeParamType(param: any): PARAM_TYPE {
  return Object.prototype.toString.call(param) as PARAM_TYPE;
}