import React from "react";
import { useState } from "react";

import './App.css'

function App() {
    // Funções para HomePage
    const [valueInput, setValueInput] = useState("");
    const [valueData, setValueData] = useState("");
    const [valueRep, setValueRep] = useState("");

    const [showUser, setShowUser] = useState(false); //TRUE TEMPORÁRIO

    // Para valor mudar quando usuário digitar
    const handleInputChange = (e) => {
        setValueInput(e.target.value)
    }

    // Funções para buscar usuários na API GitHub no UserPage

    async function searchUser() {
        const inputValue = valueInput
        const urlAPI = `https://api.github.com/users/${inputValue}`
        const urlRepository = `https://api.github.com/users/${inputValue}/repos`

        try {
            const responseUser = await fetch(urlAPI) // Espera conectar com as infos do user
            const responseRepo = await fetch(urlRepository) // Espera conectar com os repositorios do user

            if (!responseUser.ok) throw new Error("Usuário não encontrado")

            const data = await responseUser.json()
            const dataRep = await responseRepo.json()

            // Organiza os repositórios em ordem decrescente
            const sortedRepo = dataRep.sort((a, b) => b.stargazers_count - a.stargazers_count)

            setValueData(data)
            setValueRep(sortedRepo)
        }
        catch (error) {
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
        if (valueInput.trim() == "") {
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
                        <div className="divUserpage">

                            {/* Left Colum */}
                            <div className="leftColum">
                                <img 
                                    src={valueData.avatar_url} 
                                    className="avatarUser" />

                                <div className="elementsLeftColum">

                                    {/* Info User Profile */}
                                    <h1 
                                        style={{ fontSize: "40px", color: "#ECEFF4" }}>
                                        {valueData.name}
                                    </h1>

                                    <p 
                                        style={{ fontSize: "28px", marginTop: "-20px", color: "#ECEFF4" }}>
                                        @{valueData.login}
                                    </p>

                                    <p 
                                        style={{ color: "#8190A5", fontSize: "18px" }}>
                                        {valueData.bio}
                                    </p>

                                    <div style={{ display: "flex", gap: "100px" }}>
                                        <p
                                            style={{ fontFamilly: "italic", fontSize: "20px", color: "#ECEFF4" }}>

                                            <i style={{ fontSize: "16px" }} class="fa-solid fa-user-group" /> {valueData.followers} followers
                                        </p>

                                        <p
                                            style={{ fontFamilly: "italic", fontSize: "20px", color: "#ECEFF4" }}>

                                            <i class="fa-solid fa-heart" /> {valueData.following} following
                                        </p>
                                    </div>

                                    {/* User Social Midia and Info User*/}
                                    <div style={{ marginTop: "58px" }}>
                                        {valueData.company && ( // Verifica se o valor que está na API é null
                                            <p 
                                                className="pElementsSocialMidia" 
                                                style={{ fontSize: "20px", color: "#ECEFF4" }}>
 
                                                <i class="fa-solid fa-building" /> {valueData.company}
                                            </p>
                                        )}

                                        {valueData.location && (
                                            <p 
                                                className="pElementsSocialMidia"
                                                style={{ fontSize: "20px", color: "#ECEFF4" }}>
                                                    
                                                <i class="fa-solid fa-location-dot"/> {valueData.location}
                                            </p>
                                        )}

                                        {valueData.email && (
                                            <p 
                                                className="pElementsSocialMidia"
                                                style={{ fontSize: "20px", color: "#ECEFF4" }}>
                                                
                                                <i class="fa-sharp fa-solid fa-envelope" /> {valueData.email}
                                            </p>
                                        )}

                                        {valueData.blog && (
                                            <a 
                                                href={valueData.blog}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{fontSize: "20px", color: "#ECEFF4", cursor: "pointer", textDecoration: "none"}}>

                                                <i className="fa-solid fa-link" /> {valueData.blog}

                                            </a>
                                        )}
                                    </div>
                                </div>

                                <button className="buttonBack" onClick={() => window.location.reload()}>Voltar</button>
                            </div>

                            {/* Right Colum */}
                            <div className="rightColum">
                                <ul>
                                    {valueRep.map((repo) => (
                                        <li key={repo.id}>
                                            <h1>{repo.name}</h1>
                                            <p>{repo.stargazers_count} stars</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
            </div>
        </>
    )
}

export default App;