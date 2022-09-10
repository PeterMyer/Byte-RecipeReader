import { createWorker } from "tesseract.js";
import { useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';
import RecipeEditor from "./RecipeEditor";


export default function TesseractWorker(){
const {state} = useLocation()
const [imgData, setImageData] = useState(state.imgData)
const [imgText, setImgText] = useState("")
const [imgLines, setImgLines] = useState("")

useEffect(()=> {
  console.log("useEffect")
  CreateTesseractWorker()
},[])

const CreateTesseractWorker = () =>{
  const worker = createWorker();
  (async () => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    await worker.setParameters({
      preserve_interword_spaces: 1,
    });
    const result = await worker.recognize(imgData);

    setImgText(result.data.text)
    setImgLines(result.data.lines)

    await worker.terminate();

  })();
}


if(imgText != ""){
  return(
      <div>
        <RecipeEditor readImgText={imgText} />
    </div>
    )
}else{
  return(
    <div>Reading IMG...</div>
  )}
}
