export default function ImagesSidebar(){

    /* Set the width of the sidebar to 25px and the left margin of the page content to 250px */
    function openNav() {
        document.getElementById("mySidebar").style.width = "300px";
        document.getElementById("main").style.marginLeft = "300px";
    }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    } 
  

    return(
        <>
            <div id="mySidebar" className="sidebar">
                <a href = "javascript:void(0)" class = "closebtn" onClick= {() => closeNav()}>&times;</a>
                <h1  className = "sidebar-header">Byte Tips</h1>
                <div className = "sidebar-content ">
                    <h2 className = "sidebar-section-header">Recipe Images</h2>
                    <p>Recipe images are the building blocks of Byte recipes. Upload images of your recipe ingredients and instructions. You can use multiple images to build the same recipe.</p>
                    <p>For best results images should be evenly lit and text should be horizontally aligned</p>
                    <h2 className = "sidebar-section-header">Cropping Images</h2>
                    <p>Images should be cropped around the desired text for each upload. This ensure Byte focuses on the proper area while reading an image.</p>
                    <img src="ImgCropExample.jpeg" alt="none" height="200"/>
                    <p>To crop your image, click on the image to open the preview window, and then the <i class="fa-sharp fa-solid fa-crop-simple"></i> icon to open the cropper.</p>
                </div>            
            </div>
            <div id="main">
                <button class="openbtn" onClick={()=>openNav()}><i class="fa-solid fa-circle-question"></i></button>
            </div>
        </>
    )
}