import { createWorker, createScheduler } from 'tesseract.js'
import { useLocation } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { useEffect, useState } from 'react'
import {VerifyImgText} from './VerifyImgTxt'


export function TesseractScheduler(){
    const {state} = useLocation()
    const [imgBasket, setImageBasket] = useState(state.recipeOutput.recipeSelections)
    const [recipeImg] = useState(state.recipeImg)

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

            const results = await Promise.all(imgBasket.map((img) => {
                let result = scheduler.addJob('recognize',img.imgObjURL)
                return result
                }))

            setImgText(results)
            setImageBasket((imgBasket=>{
                let newBasket = []
                for(let i = 0; i<imgBasket.length; i++){
                    let obj = imgBasket[i]
                    let OcrResult = results[i]
                    obj = {...obj, OcrResult}
                    newBasket.push(obj)
                    
                }
                return newBasket}))

            await scheduler.terminate();

            history.push({ 
                pathname: '/verifyText',
                state: {imgBasket,recipeImg}
               })
            })()}

    if(imgText !== ""){
        return(
            <div>
                <VerifyImgText readImgText={imgBasket} recipeImg={recipeImg} />
            </div>
            )
        }else{
        return(
            <div className = "progress_page" >
                <h2>Reading Image</h2>
                <div className = "tesseract-progress-container">
                    <h2 id = "tesseract-progress-status">Status: </h2>
                    <strong>{statusLog1} </strong>
                    <div classNiame = "tesseract-progressbar-container">
                    <progress id="tesseract-progressbar" value = {progLog1+progLog2} max="2"/> 
                </div>
                </div>
            </div>
        )}
}
