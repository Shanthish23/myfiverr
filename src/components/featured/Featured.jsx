import React from "react";
import "./Featured.scss"

const Featured = ()=>{
    return(
        <div className="featured">
           <div className="container">
                <div className="left">

                    <h1>Scale your professional workforce with freelancers</h1>
                    <div className="search">
                        <div className="searchinput">
                            <img src="./img/search.png" alt=""/>
                            <input type="text" placeholder="Search for freelancers"/>
                        </div>
                        <button>Search</button>
                    </div>
                    <div className="popular">
                        <span>Popular:</span>
                        <button>Wordpress</button>
                        <button>Webdesign</button>
                        <button>Logo Desing</button>
                    </div>
                </div>

                <div className="right">
                    <img src="./img/man.png" alt="A man pic"></img>
                </div>
           </div>
        </div>
        );
}

export default Featured;