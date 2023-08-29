import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
    // const [username, setUsername] = useState(null);
    const { setUserInfo, userInfo } = useContext(UserContext);

    useEffect(() => {
        fetch("http://localhost:8000/profile", {
            credentials: "include",
        }).then((response) => {
            response.json().then((userInfo) => {
                setUserInfo(userInfo);
                // setUsername(userInfo.username);
            });
        });
    }, []);

    function logout() {
        fetch("http://localhost:8000/logout", {
            credentials: "include",
            method: "POST",
        });
        setUserInfo(null);
        // setUsername(null);
    }

    const username = userInfo?.username;

    return (
        <header>
            <Link to="#" className="logo">
                Blog
            </Link>
            <nav>
                {username && (
                    <>
                        <Link to="/create">Create Post</Link>
                        <a href="/" onClick={logout}>
                            Logout ({username})
                        </a>
                    </> //
                )}
                {!username && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
