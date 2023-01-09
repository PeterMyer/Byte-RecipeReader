import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react"
import { tesseractScheduler } from "../utils/tesseractScheduler";
import { useNavigate } from "react-router"

export function TesseractContainer(){
	const { state } = useLocation()
	const [ recipeSections, setRecipeSections ] = useState( state.recipeOutput.recipeSelections )
	const [ recipeImg ] = useState(Object.entries( state.recipeImg ).length > 0 ? state.recipeImg : null )
	const [ imgText, setImgText ] = useState("")
	const [ progLog1, setProgLog1 ] = useState( 0 );
	const [ statusLog1, setStatusLog1 ] = useState("");
	const [ progLog2, setProgLog2 ] = useState( 0 );
	const navigate = useNavigate();

	useEffect(() => {
		let propsObject = {
			setProgLog1,
			setStatusLog1,
			setProgLog2,
			recipeSections,
			setImgText,
			setRecipeSections,
			recipeImg
		}
		tesseractScheduler( propsObject )
	},[])

  if ( imgText !== "" ) {
		navigate( "/verifyText", {
			state: {
				"readImgText" : recipeSections, 
				"recipeImg" : recipeImg
			}
		})
	}

	return(
		<article className = "progress_page">
			<h2>Reading Image...</h2>
			<div className = "tesseract-progress-container">
				<h2 id = "tesseract-progress-status">Status: </h2>
				<strong>{ statusLog1 }</strong>
				<div classNiame = "tesseract-progressbar-container">
					<progress id = "tesseract-progressbar" value = { progLog1 + progLog2 } max = "2"/> 
				</div>
			</div>
		</article>
	)
}
