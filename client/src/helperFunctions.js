

// Create Blob file from URL
  // ref: https://www.geeksforgeeks.org/how-to-convert-data-uri-to-file-then-append-to-formdata/

export function blobCreationFromURL(inputURI) {
  let binaryVal
  // mime extension extraction
  let inputMIME = inputURI.split(',')[0].split(':')[1].split(';')[0];
  console.log(inputMIME)

  // Extract remaining part of URL and convert it to binary value
  if (inputURI.split(',')[0].indexOf('base64') >= 0){
   binaryVal = atob(inputURI.split(',')[1]);}

      // Decoding of base64 encoded string
  else{
    binaryVal = unescape(inputURI.split(',')[1])}

    // Computation of new string in which hexadecimal
        // escape sequences are replaced by the character
        // it represents
  let blobArray = []
  for (let index = 0; index < binaryVal.length; index++) {
    blobArray.push(binaryVal.charCodeAt(index));
}
  let blob = new Blob([blobArray], {
    type: inputMIME
});
console.log('blob:', blob)

return new File([blob], "img-file",{type: "image/png"});

}


export function saveBase64AsFile(base64, fileName) {
  var link = document.createElement("a");
  document.body.appendChild(link);
  link.setAttribute("type", "hidden");
  link.href = "data:text/plain;base64," + base64;
  link.download = fileName;
  link.click();
  document.body.removeChild(link);
}

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob

export function canvasToImage(canvas){
  canvas.toBlob(function(blob) {
    const newImg = document.createElement('img');
    const url = URL.createObjectURL(blob);

    newImg.onload = function() {
      // no longer need to read the blob so it's revoked
      URL.revokeObjectURL(url);
    };

    newImg.src = url;
    document.body.appendChild(newImg);

    return newImg
})}
