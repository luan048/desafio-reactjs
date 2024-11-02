import React from "react";

import './App.css'

function App() {
    return (
        <div className="divHomePage">
            <p className="pSearch">Search Devs</p>
            <div className="elementsHomePage">
                <input className="inputHomePage" type="text" placeholder="Type the username here..."/>
                <button className="buttonHomePage"><i className="fa-solid fa-magnifying-glass"/> Buscar</button>
            </div>
        </div>
    )
}

export default App;