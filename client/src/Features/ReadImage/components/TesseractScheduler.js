import { createWorker, createScheduler } from 'tesseract.js'
import { useLocation } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { useEffect, useState } from 'react'
import {VerifyImgText} from './VerifyImgTxtContainer'

export function TesseractScheduler(){
    const {state} = useLocation()
    const [recipeSections, setRecipeSections] = useState(state.recipeOutput.recipeSelections)
    const [recipeImg] = useState(Object.entries(state.recipeImg).length>0? state.recipeImg : null)
    const [imgText, setImgText] = useState("")
    let history = createBrowserHistory();
    const [progLog1, setProgLog1] = useState(0);
    const [statusLog1, setStatusLog1] = useState("");
    const [progLog2, setProgLog2] = useState(0);

    useEffect(()=>{
        CreateTesseractScheduler()
    },[])

    const CreateTesseractScheduler = ()=>{
        const scheduler = createScheduler();
        const worker1 = createWorker({
            logger: (m) => {
                setProgLog1(m.progress)
                setStatusLog1(m.status)
            },
          });
        const worker2 = createWorker(
            {
                logger: (m) => {
                    setProgLog2(m.progress)
                },
              }
          );
        (async() =>{
            await worker1.load();
            await worker2.load();
            await worker1.loadLanguage("eng");
            await worker2.loadLanguage("eng");
            await worker1.initialize("eng");
            await worker2.initialize("eng");
            await worker1.setParameters({
                preserve_interword_spaces: 1,
            })
            await worker2.setParameters({
                preserve_interword_spaces: 1,
            })
            scheduler.addWorker(worker1)
            scheduler.addWorker(worker2)

            const results = await Promise.all(recipeSections.map((img) => {
                let result = scheduler.addJob('recognize',img.imgObjURL)
                return result
                }))

            setImgText(results)
            setRecipeSections((section=>{
                let currentSections = []
                for(let i = 0; i<section.length; i++){
                    let obj = section[i]
                    let OcrResult = results[i]
                    obj = {...obj, OcrResult}
                    currentSections.push(obj)
                    
                }
                return currentSections}))

            await scheduler.terminate();

            history.push({ 
                pathname: '/verifyText',
                state: {recipeSections,recipeImg}
               })
            })()}

    if(imgText !== ""){
        return(
            <VerifyImgText readImgText={recipeSections} recipeImg={recipeImg} />
            )
        }else{
        return(
            <article className = "progress_page" >
                <h2>Reading Image...</h2>
                <div className = "tesseract-progress-container">
                    <h2 id = "tesseract-progress-status">Status: </h2>
                    <strong>{statusLog1} </strong>
                    <div classNiame = "tesseract-progressbar-container">
                    <progress id="tesseract-progressbar" value = {progLog1+progLog2} max="2"/> 
                </div>
                </div>
            </article>
        )}
}
