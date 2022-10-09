import { createWorker, createScheduler } from 'tesseract.js'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import RecipeEditor from './RecipeEditor';
import VerifyImgText from './VerifyImgTxt'


export default function TesseractScheduler(){
    const {state} = useLocation()
    const [imgBasket, setImageBasket] = useState(state.basketState)
    const [imgText, setImgText] = useState("")

    useEffect(()=>{
        console.log(imgBasket)
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
                return result}))
                console.log(results)
            setImgText(results)
            await scheduler.terminate();
            })()}

    if(imgText !== ""){
        return(
            <div>
                <VerifyImgText readImgText={imgText} />
            </div>
            )
        }else{
        return(
            <div>Reading IMG...</div>
        )}
}
