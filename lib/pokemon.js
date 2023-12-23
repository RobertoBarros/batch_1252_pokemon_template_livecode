import Mustache from "mustachejs";

const url = `https://pokeapi.co/api/v2/pokemon?limit=10`
const cardTemplate = document.getElementById('cardTemplate').innerHTML
const cardsContainer = document.getElementById('cardsContainer')
const infoTemplate = document.getElementById('infoTemplate').innerHTML
const infoContainer = document.getElementById('infoContainer')


fetch(url)
  .then(response => response.json())
  .then((data) => {
    data.results.forEach((result)=>{
      const detailUrl = result.url
      fetch(detailUrl)
        .then(response => response.json())
        .then((data) => {
          // console.log(data);

          const info = {
            imageUrl: data.sprites.front_shiny,
            pokemonName: data.name,
            types: data.types.map((a_type) => { return a_type.type.name})
          }

          const output = Mustache.render(cardTemplate, info)
          cardsContainer.insertAdjacentHTML('beforeend', output)

          document.getElementById(data.name).addEventListener('click',(event) => {
            event.preventDefault();

            const url = `https://pokeapi.co/api/v2/pokemon/${event.currentTarget.dataset.name}`
            fetch(url)
              .then(response => response.json())
              .then((data) => {

                // console.log(data);

                const info = {
                  imageUrl: data.sprites.front_default,
                  pokemonName: data.name,
                  abilities: data.abilities.map((an_ability) => { return an_ability.ability.name}).join(',')
                }

                const output = Mustache.render(infoTemplate,info)
                infoContainer.innerHTML = output
              })

          })


        })
    })
  })
