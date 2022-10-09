import RecipeEditor from "./RecipeEditor"

export default function VerifyImgText(props){
    let imgText = props.readImgText


    return(
        <div>
            <header> Verify Recipe Results</header>
            <div>Instructions</div>
                <div>
                {imgText.filter((imgObj)=>imgObj.location==="Instructions").map((imgObj)=>{
                    return(
                        <div>
                            <RecipeEditor readImgText={imgObj.OcrResult.data.text}/> 
                            <img
                                src={imgObj.imgBlob}
                                height="250"
                                width="250"
                                alt="null"/>                
                        </div>)})}
            <div>        -------------             </div>
            <div>Ingredients</div>
            <div>
                {imgText.filter((imgObj)=>imgObj.location==="Ingredients").map((imgObj)=>{
                    return(
                        <div>
                            <RecipeEditor readImgText={imgObj.OcrResult.data.text}/> 
                            <img
                                src={imgObj.imgBlob}
                                height="250"
                                width="250"
                                alt="null"/>                
                        </div>)})}

        </div>
        </div>
        </div>
    )
}