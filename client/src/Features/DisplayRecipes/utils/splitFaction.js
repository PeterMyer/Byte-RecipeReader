export function splitFraction( qty ) {
  if ( qty.includes("/") ) {
    let splitFraction = qty.split("/")
    qty = parseInt( splitFraction[0], 10 ) / parseInt( splitFraction[1], 10 )
  }
  return qty
}