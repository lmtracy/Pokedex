// let ul = document.querySelector("ul")
//
// class Sapphire {
//   constructor() {
//     this.all = [];
//   }
//
//   add(pokemon) {
//     this.all.push(pokemon)
//   }
// }
// //get command
//
//
// class Pokemon {
// 	constructor(name, hp, attack, defense, abilities) {
// 		this.name = name
// 		this.hp = hp
// 		this.attack = attack
// 		this.defense = defense
// 		this.abilities = abilities
// 	}
// }
//
// const pokemonIds = ["143", "249", "175"]
// axios.get("https://pokeapi.co/api/v2/pokemon/143/")
// .then((response) => {
//   let data = response.data
//   // console.log(data)
//   let sapphire = new Sapphire ()
//
// data.forEach((item) => {
//   let li = document.createElement("li")
//   let pokemon = new Pokemon ()
//
//   sapphire.add(
//     new Pokemon (
//       item.name,
//       // item.hp,
//       // item.attack,
//       // item.defense,
//       // item.abilities
//     )
//   )
//   li.innerHTML = item.name
//
//   ul.appendChild(li)
// })
// })



//Experimental Code
class Sapphire {
    constructor() {
        this.pokemons = []
    }

    add(pokemon) {
        this.pokemons.push(pokemon)
    }

    all() {
        return this.pokemons
    }

    get(name) {
        return this.pokemons.find(pokemon => pokemon.name === name);
    }
}

class Pokemon {
    constructor(name, hp, attack, defense, abilities, pic) {
        this.name = name
        this.hp = hp
        this.attack = attack
        this.defense = defense
        this.abilities = abilities
        this.pic = pic
    }
}

let sapphire = new Sapphire()

let mainDiv = document.getElementById("main")


const pokemonIds = ["143", "249", "175"];
pokemonIds.forEach((id, idx) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((response) => {
            let { name, stats, abilities } = response.data

            abilities = getAbilities(abilities)

            let hp = getStat(stats, "hp")
            let attack = getStat(stats, "attack")
            let defense = getStat(stats, "special-defense")

            let pic = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;

            let pokemon = new Pokemon(name, hp, attack, defense, abilities, pic)

            sapphire.add(pokemon)

            let divPoke = document.createElement("div")
            divPoke.className = `box box-${idx}`
            mainDiv.appendChild(divPoke)

            let divImg = document.createElement("div")
            divImg.className = "img-wrapper"
            divPoke.appendChild(divImg)
            let imgPoke = document.createElement("img")
            imgPoke.src = pic
            divImg.appendChild(imgPoke)

            let divInfo = document.createElement("div")
            divInfo.className = "info"
            divPoke.appendChild(divInfo)

            let ul = document.createElement("ul")
            ul.className = "description"
            divInfo.appendChild(ul)
            let h2 = document.createElement("h2")
            ul.appendChild(h2)

            for (const prop in pokemon) {
                if (prop !== "pic") {
                    if (prop === "name") {
                        h2.innerHTML = `${pokemon[prop].toUpperCase()}`
                    } else {
                        let list = document.createElement("li")
                        ul.appendChild(list)
                        list.innerHTML = `${prop}: ${pokemon[prop]}`
                    }

                }
            }

            imgPoke.addEventListener("click", (event) => {
                console.log(event)
                let boxes = document.querySelectorAll(".box")
                boxes.forEach((box) => {
                    box.style.display = "none"
                })

                let activeBox = event.target.parentNode.parentNode;
                let isActive = activeBox.getAttribute("active");

                if (!isActive) {
                    divInfo.style.display = "flex"
                    imgPoke.style.width = "400px"
                    divPoke.style.width = "100%"
                    imgPoke.style.filter = "none"
                    activeBox.style.display = "flex"
                    activeBox.setAttribute("active", "true");
                } else {
                    divInfo.style.display = "none";
                    divPoke.style.width = "33%"
                    imgPoke.style.width = "300px"
                    imgPoke.style.filter = "grayscale(1)"
                    activeBox.setAttribute("active", "");
                    boxes.forEach((box) => {
                        box.style.display = "flex"
                    })
                }
            })
            console.log(pokemon)
        }).catch((error) => {
            console.log(error)
        })
})

function getStat(stats, name) {
    let stat = stats.find(el => el.stat.name === name)
    return stat.base_stat;
}

function getAbils(abils) {
    let abilities = []
    abils.forEach(el => abilities.push(el.ability.name))
    return abilities.join(", ")
}
