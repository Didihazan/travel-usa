import {Link} from "react-router-dom";
import '../LogOut.css'
import {FaPlane} from "react-icons/fa";
const LogOut = ()=>{
    const Leaving=()=> {
        // console.log(1)
        localStorage.removeItem('token');
        window.location.reload();
    }
    // const logOutHandler = () => {
    //     // Log out functionality
    // };
    return(

            <button className="logOutButton" onClick={Leaving}>
                <div className="planeContainer">
                    <FaPlane className="planeIcon" />
                </div>
                <span className="logOutText">Log Out</span>
            </button>
        )
}
export default LogOut
