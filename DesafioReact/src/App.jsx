import React from "react";
import { useState } from "react";

import './App.css'

function App() {
    // Funções para HomePage
    const [valueInput, setValueInput] = useState("");
    const [valueUsername, setValueUsername] = useState("");

    const [showUser, setShowUser] = useState(true); //TRUE TEMPORÁRIO

    // Para valor mudar quando usuário digitar
    const handleInputChange = (e) => {
        setValueInput(e.target.value)
    }

    // Funções para buscar usuários na API GitHub no UserPage

    async function searchUser() {
        const inputValue = valueInput
        const urlAPI = `https://api.github.com/users/${inputValue}`

        try {
            const response = await fetch(urlAPI)
            if(!response.ok) throw new Error("Usuário não encontrado")
            const data = await response.json()
            setValueUsername(data.login)
        }
        catch(error) {
            alert(error.message)
            setShowUser(false)
        }
    }

    // Fim das Funçoes  para UserPage

    /* Para trocar página sem precisar trocar rota
       e acionar a busca pelo usuário
    */
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(valueInput.trim() == "") {
            alert("Campo vazio!")
            return;
        }
        // Esperar receber os valores da API para trocar a page
        await searchUser()
        setShowUser(true)
    }

    return (
        <>
            <div className="divGeneral">
                {/* Home Page*/}
                {!showUser ? (
                    <div className="divHomePage">
                        <p className="pSearch">Search Devs</p>
                        <div className="elementsHomePage">

                            <input 
                                value={valueInput}
                                onChange={handleInputChange}
                                className="inputHomePage"
                                type="text" placeholder="Type the username here..."
                            />

                            <button 
                                onClick={handleSubmit}
                                className="buttonHomePage">
                                <i className="fa-solid fa-magnifying-glass" /> Buscar
                            </button>
                        </div>
                    </div>
                ) :

//              {/* User page */}
                (
                    <div>
                        <p>TESTE</p>
                        <p>{valueUsername}</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default App;