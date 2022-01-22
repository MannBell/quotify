import { isEmpty } from "react-redux-firebase";
// Functions
import spreadObj from "./spreadObj";

export default function getRatingFromObj (ratingObj) {
  return isEmpty(ratingObj) 
          ? 0
          : ((arr)=>{
            // Below: Sum up the rating then divide by length of array to obtain the Mean(average)
            return (arr.reduce((acc, curr) => acc+curr, 0)/arr.length)
                    .toFixed(1)
                    .replace(".0", "");
          })(spreadObj(ratingObj));
}