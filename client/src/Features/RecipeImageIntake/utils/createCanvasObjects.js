import { fabric } from "fabric"

export function createCanvasObjects( canvas, selectionObjects ) {
	const HideControls = {
		"tl": false,
		"tr": false,
		"bl": false,
		"br": false,
		"ml": false,
		"mt": false,
		"mr": false,
		"mb": false,
		"mtr": false
	}

	const movementParams = {
		lockMovementX: true,
		lockMovementY: true,
		lockScalingX: true,
		lockScalingY: true,
		lockRotation: true,
	}

	if ( Object.keys(selectionObjects).length > 0 ) {
		Object.values(selectionObjects).forEach(( cropObject ) => {
			const croppedCoordinates = cropObject.coordinates
			let rect = new fabric.Rect({
				top: croppedCoordinates.top,
				left: croppedCoordinates.left,
				width: croppedCoordinates.width,
				height: croppedCoordinates.height,
				stroke : "blue",
				strokeWidth : 1,
				fill: "white",
				opacity: .3,
				id:cropObject.id,
				...movementParams,
			})

			let text = new fabric.Text(` ${cropObject.location} `, {
				left: croppedCoordinates.left,
				top: croppedCoordinates.top,
				textAlign: "left",
				fontSize: 14,
				width: 100,
				textBackgroundColor: "white",
				opacity: .7,
				selectable: false,
				id: cropObject.id,
				...movementParams,
			})
			rect.setControlsVisibility(HideControls)
			canvas.add(rect)
			canvas.add(text)
		})
	}
}
    
