//Shoutout to Mariia and MD for assitance on this

//Container class
class Sapphire {
    constructor() {
        this.pokemons = []
    }

    add(pokemon) {
        this.pokemons.push(pokemon)
    }

    //get method for trainer class
    get(name) {
    for (let i = 0; i < this.pokemons.length; i++) {
        if (name === this.pokemons[i].name) {
            return this.pokemons[i]
        }
    }
  }
}

//Individual class
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

//API for lugia
 axios.get(`https://pokeapi.co/api/v2/pokemon/249/`)
      .then((response) => {
          let { name, stats, abilities } = response.data

          abilities = getAbilities(abilities)
          let hp = getStat(stats, "hp")
          let attack = getStat(stats, "attack")
          let defense = getStat(stats, "special-defense")
          let pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/249.png`;

          let pokemon = new Pokemon(name, hp, attack, defense, abilities, pic)

          sapphire.add(pokemon)

          let addPoke = document.createElement("div")
          monInfo.appendChild(addPoke)

//Sprite callback
          let makeImg = document.createElement("div")
          addPoke.appendChild(makeImg)
          let monSprite = document.createElement("img")
          monSprite.src = pic
          makeImg.appendChild(monSprite)

//Stat & abilities callback
          let divInfo = document.createElement("div")
          divInfo.className = "info"
          addPoke.appendChild(divInfo)

          let ul = document.createElement("ul")
          divInfo.appendChild(ul)
          let h2 = document.createElement("h2")
          ul.appendChild(h2)

          for (let data in pokemon) {
              if (data !== "pic") {
              if (data === "name") {
                      h2.innerHTML = `You caught ${pokemon[data].toUpperCase()}`
            } else {
              let list = document.createElement("li")
              ul.appendChild(list)
              list.innerHTML = `${data}: ${pokemon[data]}`
              }
          }
      }
    })

//functions to return API data
function getStat(stats, name) {
    let stat = stats.find(el => el.stat.name === name)
    return stat.base_stat;
}

function getAbilities(ability) {
    let abilities = []
    ability.forEach(el => abilities.push(el.ability.name))
    return abilities.join(", ")
}
