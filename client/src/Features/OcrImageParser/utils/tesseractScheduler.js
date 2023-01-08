import { createWorker, createScheduler } from 'tesseract.js'

export function tesseractScheduler(props){
    let setProgLog1 = props.setProgLog1
    let setStatusLog1 = props.setStatusLog1
    let setProgLog2 = props.setProgLog2
    let recipeSections = props.recipeSections
    let setImgText = props.setImgText
    let setRecipeSections = props.setRecipeSections

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
        setRecipeSections((recipeSections=>{
            let currentSections = []
            for(let i = 0; i<recipeSections.length; i++){
                let obj = recipeSections[i]
                let OcrResult = results[i]
                obj = {...obj, OcrResult}
                currentSections.push(obj)
                
            }
            return currentSections}))

        await scheduler.terminate();

        })()}