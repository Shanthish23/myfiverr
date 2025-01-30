import React, { useEffect } from "react";
import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import newRequest from "../../utils/newRequest";
const Navbar = () => {

    const [active,setActive] = useState(false);
    const [open,setOpen] = useState(true);


    const isActive = () => {
        window.scrollY >= 0 ? setActive(true) : setActive(false);
    }

    useEffect(() => {
        window.addEventListener("scroll",isActive);

        return () => {
            window.removeEventListener("scroll",isActive);
        }
    },[]);

    const currentUser = JSON.parse(localStorage.getItem("currentUser",))
    const navigate=useNavigate();

    const handleLogout = async() => {
        try{
            await newRequest.post("/auth/logout")
            localStorage.setItem("currentUser",null)
            navigate("/")
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className={active ? "navbar active" : "navbar"}>
        <div className="container">
            <div className="logo">
                <Link to= "/" className="link">
                <span className="text">fiverr</span>
                </Link>
                
                <span className="dot">.</span>
            </div>
            <div className="links">
            <span>Fiverr Buisness</span>
            <span>Explore</span>
            <span>English</span>
            <span>Sign in</span>
            {!currentUser?.isSeller && <span>become a Seller</span>}
            {!currentUser && <Link className="link" to="/register">
                <button>Join</button>
              </Link>}
            {currentUser && (
                <div className="user" onClick={() => setOpen(!open)}> 
                    <img src={currentUser.img || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
                    <span>{currentUser.username}</span>
                   { open && <div className="options">
                        {
                            currentUser.isSeller && (
                                <>
                                <Link to="/mygigs">Gigs</Link>
                                <Link to="/add">Add New Gig</Link>
                                </>
                            )
                        }
                        <Link to="/orders">Orders</Link>
                        <Link to="/messages">Messages</Link>
                        <Link onClick={handleLogout}>Logout</Link>
                    </div>}
                </div>
            )}
            </div>
        </div>
        {active &&(
        <>
        <hr/>
        <div className="menu">
            <Link className="link" to="/">Graphics Desing</Link>
            <Link className="link" to="/">Video & Animation</Link>
            <Link className="link" to="/">Writing Translations</Link>
            <Link className="link" to="/">Digital Marketting</Link>
            <Link className="link" to="/">AI services</Link>
            <Link className="link" to="/">Music & Audio</Link>
            <Link className="link" to="/">Programming & Tech</Link>
            <Link className="link" to="/">Buisness</Link>
            <Link className="link" to="/">LifeStyle</Link>


        </div>
        </>
        )}
        </div>
    );
    }

    export default Navbar;