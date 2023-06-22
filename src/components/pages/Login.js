
import {useNavigate } from "react-router-dom";
import '../Login.css'
import '../../App.css';


export default function Login(prop) {
    let navigate = useNavigate()
    const HandleLogin = (event)=>{
        const name = event.target[0].value
        const pass = event.target[1].value

        let url ="http://localhost:3001/users"
        fetch(url).then((result)=> {return result.json()}).then((data)=>{
            data.forEach(user =>{
                        if (user.password === pass && user.userName === name){
                            prop.setIsAuthenticated(true)
                            prop.setuser(user)
                        }
                    })
        })
        if (prop.user){
            return navigate("/")
        }
        event.preventDefault()

    }


    return (
        <div className="login-container">
            <form className="login-form" onSubmit={HandleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                />
                <button type="submit" className="login-button" >
                    Log In
                </button>
            </form>
        </div>
    );
}
