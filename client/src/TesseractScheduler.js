import { createWorker, createScheduler } from 'tesseract.js'
import { useLocation } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { useEffect, useState } from 'react'
import RecipeEditor from './RecipeEditor';
import VerifyImgText from './VerifyImgTxt'


export default function TesseractScheduler(){
    const {state} = useLocation()
    const [imgBasket, setImageBasket] = useState(state.basketState)
    const [imgText, setImgText] = useState("")
    let history = createBrowserHistory();

    useEffect(()=>{
        CreateTesseractScheduler()
    },[])

    const CreateTesseractScheduler = ()=>{
        const scheduler = createScheduler();
        const worker1 = createWorker();
        const worker2 = createWorker();
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
                let result = scheduler.addJob('recognize',img.imgBlob)
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
                state: imgBasket
               })
            })()}

    if(imgText !== ""){
        return(
            <div>
                <VerifyImgText readImgText={imgBasket} />
            </div>
            )
        }else{
        return(
            <div>Reading IMG...</div>
        )}
}
