import { splitFraction } from "./splitFaction"
import { splitMixedNumber } from "./splitMixedNumber"

export function handleQuantityInts( qty ) {
  if ( qty.includes(" ") ) {
    qty = splitMixedNumber( qty )
    return qty
  } else if ( qty.includes("/") ) {
    qty = splitFraction( qty )
    return qty
  } else {
    return qty
  }
}