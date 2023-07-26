

const LogOut = ()=>{
    const Leaving=()=> {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return(

        <button type="button" onClick={Leaving}>log-out</button>
        )
}
export default LogOut