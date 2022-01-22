import spreadObj from "./spreadObj";

export default function spreadObjsInArr (arr) {
  return arr.reduce((acc, curr)=> [...acc, ...spreadObj(curr)], [])
}