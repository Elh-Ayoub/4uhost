import loading from "../images/loading.gif"
function Loader(){
    // document.querySelector(".loader_bg").className = "d_none"
    return(
        <div className="loader_bg">
            <div className="loader"><img src={loading} alt="#"/></div>
        </div>
    )
}

export default Loader