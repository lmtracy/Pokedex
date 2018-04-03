class Sapphire {
    constructor() {
        this.pokemons = []
    }

    add(pokemon) {
        this.pokemons.push(pokemon)
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
let monInfo = document.getElementById("main")

 axios.get(`https://pokeapi.co/api/v2/pokemon/143/`)
        .then((response) => {
            let { name, stats, abilities } = response.data


            abilities = getAbils(abilities)
            let hp = getStat(stats, "hp")
            let attack = getStat(stats, "attack")
            let defense = getStat(stats, "special-defense")
            let pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png`;

            let pokemon = new Pokemon(name, hp, attack, defense, abilities, pic)

            sapphire.add(pokemon)

            let addPoke = document.createElement("div")
            addPoke.className = `143`
            monInfo.appendChild(addPoke)

            let divImg = document.createElement("div")
            divImg.className = "img-wrapper"
            addPoke.appendChild(divImg)
            let imgPoke = document.createElement("img")
            imgPoke.src = pic
            divImg.appendChild(imgPoke)

            // poke stats
            let divInfo = document.createElement("div")
            divInfo.className = "info"
            addPoke.appendChild(divInfo)

            let ul = document.createElement("ul")
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
   
            console.log(pokemon)
        }).catch((error) => {
            console.log(error)
        })

// Returns stat value by name
function getStat(stats, name) {
    let stat = stats.find(el => el.stat.name === name)
    return stat.base_stat;
}

// Returns string of abilities
function getAbils(abils) {
    let abilities = []
    abils.forEach(el => abilities.push(el.ability.name))
    return abilities.join(", ")
}
