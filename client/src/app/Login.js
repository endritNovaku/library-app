import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import "./login.css"

export default function Login () {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const url = useNavigate()
    const handleUpdateCookies = event => {
        document.cookie = username + " " + password;
        if (document.cookie === "admin password") {
            url("/admin")
        }
    }

    return(
        <div id="adminLogin">
            <form id="formLogin">
                <h3>Admin Login</h3>
                <div id="username">
                <label>Username</label>
                <input type="text" onChange={event => {
                    const { value } = event.target
                    setUsername(value)
                }}/>
                </div>
                <div id="password">
                <label>Password</label>
                <input type="password" onChange={event => {
                    const { value } = event.target
                    setPassword(value)
                }}/>
                </div>
                <button className="button-5" onClick={handleUpdateCookies}>LogIn</button>
            </form>
        </div>
    )
}