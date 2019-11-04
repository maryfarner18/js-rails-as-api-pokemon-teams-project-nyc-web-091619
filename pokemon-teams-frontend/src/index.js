const BASE_URL = "http://localhost:3000/api"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(){

    function appendPoke(poke, pokeList){
     
        let li = document.createElement("li")
        li.dataset.pokemon_id = poke["id"]
        if(poke["attributes"] != undefined){
            li.innerText = `${poke["attributes"]["nickname"]} (${poke["attributes"]["species"]}) `
        }else{
            li.innerText = `${poke["nickname"]} (${poke["species"]}) `
        }

        let releaseButton = document.createElement("button")
        releaseButton.className = "release"
        releaseButton.innerText = "Release!"
        releaseButton.dataset.pokemon_id = poke["id"]
        releaseButton.addEventListener("click", releasePokeHandler)
        
        li.appendChild(releaseButton)

        pokeList.appendChild(li)
        
    }
    
    function addPokeHandler(e){

        //locate the card to add the poke to and it's ul
        let pokeList = e.target.parentNode.getElementsByTagName("ul")[0]
        
        if (e.target.parentNode.getElementsByTagName("li").length < 6){
            fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    accepts: "application/json"
                },
                body: JSON.stringify({trainer_id: e.target.dataset.trainer_id})

            }).then(resp => resp.json())
                .then(data => appendPoke(data["data"], pokeList))
        }else{
            alert("This Trainer's Team is Full!")
        }
    }

    function removePoke(id, list){
        let li = list.querySelector(`[data-pokemon_id="${id}"]`)
  
         list.removeChild(li)
    }

    function releasePokeHandler(e){
        //get the list we want to delete from
        let pokeList= e.target.parentNode.parentNode
        let id = e.target.dataset.pokemon_id

        fetch(`${POKEMONS_URL}/${id}`, {
            method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    accepts: "application/json"
                },
            })
            .then(removePoke(id, pokeList))
        
    }

    function processTrainers(trainers){
        
        trainers.forEach(function(trainer){
            let card = document.createElement("div")
            card.className = "card"
            card.dataset.id = trainer["id"]
            
            let nameHeader = document.createElement("h2")
            nameHeader.innerText = trainer["attributes"]["name"]
            card.appendChild(nameHeader)

            let addPokeButton = document.createElement("button")
            addPokeButton.innerText = "Add Pokemon!"
            addPokeButton.dataset.trainer_id = trainer["id"]
            addPokeButton.addEventListener("click", addPokeHandler)
            card.appendChild(addPokeButton)


            let pokeList = document.createElement("ul")
            

            //now add each Pokemon
            trainer["attributes"]["pokemons"].forEach(function(poke){
                appendPoke(poke, pokeList)
            })

            card.appendChild(pokeList)

            let main = document.body.getElementsByTagName("main")[0]
            main.appendChild(card)


        })
        
    }

    function fetchTrainers(){

        fetch(TRAINERS_URL)
            .then(resp => resp.json())
            .then(data => processTrainers(data["data"]))
    }
    

    fetchTrainers()
   
})

