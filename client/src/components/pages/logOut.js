import {Link} from "react-router-dom";

const LogOut = ()=>{
    const Leaving=()=> {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return(
        <Link to="Log-out">
        <button type="button" onClick={Leaving}>log-out</button>
        </Link>)
}
export default LogOut