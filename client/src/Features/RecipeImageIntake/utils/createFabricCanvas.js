import { fabric } from "fabric"

export function createFabricCanvas( imgElement, setHeight, width ) {
	const imgInstance = new fabric.Image( imgElement )
	imgInstance.scaleToWidth( width )
	let imageHeight = imgInstance.getScaledHeight()
	let canvas = new fabric.Canvas( "canvas", {
		width: width,
		height: imageHeight,
		preserveObjectStacking: true,
		selectable: false
	})
	canvas.setBackgroundImage( imgInstance, canvas.renderAll.bind( canvas ), {
		selectable: false
	})
	setHeight(imageHeight)
	return canvas
}
