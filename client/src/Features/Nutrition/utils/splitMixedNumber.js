import { splitFraction } from "./splitFaction"

export function splitMixedNumber( qty ) {
    let splitNumber = qty.split(" ")
    let wholeNum = parseInt( splitNumber[0] )
    let fraction = splitFraction( splitNumber[1] )
    qty = wholeNum + fraction
    return qty
  }