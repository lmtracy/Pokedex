let ul = document.querySelector("ul")

class Sapphire {
  constructor() {
    this.all = [];
  }

  add(pokemon) {
    this.all.push(pokemon)
  }
}

class Pokemon {
	constructor(name, hp, attack, defense, abilities) {
		this.name = name;
		// this.hp = hp;
		// this.attack = attack;
		// this.defense = defense;
		// this.abilities = abilities;
	}
}

axios.get("https://pokeapi.co/api/v2/pokemon/143/")
.then((response) => {
  let data = response.data
  // console.log(data)
  let sapphire = new Sapphire ()

data.forEach((item) => {
  let li = document.createElement("li")
  let pokemon = new Pokemon ()

  sapphire.add(
    new Pokemon (
      item.name,
      // item.hp,
      // item.attack,
      // item.defense,
      // item.abilities
    )
  )
  li.innerHTML = item.name

  ul.appendChild(li)
})
})
