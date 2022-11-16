
export default function VerifySidebar(){
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
                    <h2>Verifying Results</h2>
                    <p>Here you can review the results from Byte's image reading and make adjustments where necessary.</p>
                    <p>When you are satisfied with the text you can click "Accept Results" to generate the recipe.</p>
                </div>
            </div>
            <div id="main">
            <button class="openbtn" onClick={()=>openNav()}><i class="fa-solid fa-circle-question"></i></button>
        </div>
        </>
    )
}