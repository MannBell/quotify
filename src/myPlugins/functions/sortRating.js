import getRatingFromObj from "./getRatingFromObj";

export default function sortRating(arr, params={}) {
  const {
    asc=false
  } = params;

  return (
    arr
    // REPLACED ">" & "<" with "-", to make it work on chrome
    .sort((a, b) => asc ? getRatingFromObj(a.rating) - getRatingFromObj(b.rating) : getRatingFromObj(b.rating) - getRatingFromObj(a.rating) )
  );
}