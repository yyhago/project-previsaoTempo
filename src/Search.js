import React from "react";
import { useState } from "react";

function Search(){

    const [cidade,setCidade] = useState ("");

    function detectarPesquisa(e){
        e.preventDefault();
        
       
        // tempo real a cada vez que detectar um caracter no campo input
        let currentValue = document.querySelector('input[name=detectarPesquisa]').value;
        
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`;

            fetch(url)
                .then(response => response.json())
                .then (data =>{

                    const {main, name, sys, weather} = data;

                    if(sys != undefined)
                        console.log(sys);

                    if(weather != undefined){
                       
                        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${

                            weather[0]["icon"]}.svg`;

                            setCidade(`
                            
                            <div class="containerCidade">
                                <p>Temperatura: ${main.temp} Cº</p>
                                <p>País: ${sys.country}</p>
                                <p>Cidade: ${name}</p>

                                
                                <img src="${icon}" />
                            </div>
                            `);
                        
                    
                    }
                })

    }

    return(
    <div className="searchWraper">

        <div className="search">
            <h2>Digite o nome da cidade que quer saber a previsão:</h2>
        <form onSubmit={(e)=>detectarPesquisa(e)}>
            <input type="text" name="detectarPesquisa" placeholder="Digite a Cidade..." />
            <input type="submit" value="Procurar!" />
        </form>
        </div>
       

        {
            (cidade != "")?
            <div dangerouslySetInnerHTML={{__html: cidade}} />
            :
            <div className="pesqalgo">Pesquise por algo acima..</div>
        }



    </div>
    )

}


export default Search;