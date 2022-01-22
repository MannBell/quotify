import { isEmpty } from "react-redux-firebase";

export default function cleanFalsy(arr) {
  return arr.filter((arrEl) => !isEmpty(arrEl))
}