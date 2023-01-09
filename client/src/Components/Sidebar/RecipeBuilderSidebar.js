
export default function RecipeBuilderSidebar(){

    /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
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
        <div id="mySidebar" class="sidebar">
            <a href="javascript:void(0)" class="closebtn" onClick={()=>closeNav()}>&times;</a>
            <h1  className="sidebar-header">Byte Tips</h1>
            <div className = "sidebar-content ">
                <h2 className = "sidebar-section-header">Prepping A Recipe</h2>
                <p>Drag and drop your recipe images into the appropriate buckets.</p>
                <h2 className = "sidebar-section-header">Order Matters!</h2>
                <p>Byte will read images in the drop area from left to right. Text from images read first will appear high on the final recipe page. Be sure to put your images in the desired order! </p>
                <h2 className = "sidebar-section-header">Ready, Set...Build!</h2>
                <p>Once you have your images ordered how you want hit the "Build" button at the bottom of the page</p>
            </div>            
        </div>
        <div id="main">
            <button class="openbtn" onClick={()=>openNav()}><i class="fa-solid fa-circle-question"></i></button>
        </div>
        </>
    )
}