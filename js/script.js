import { getCharacter } from "./api.js";

//---------------grab the elements--------------------//
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const status = document.getElementById("status");
const result = document.getElementById("result");


const goodButton = document.getElementById("good-button");
const badButton = document.getElementById("404-button");
const networkButton = document.getElementById("network-button");


//console.log( await getCharacter(1));

//Character name, Image, Status, and Species on a card.

//----------------- Build a card for one character-----------
// this is for building a card with information on it
const createCharacter = (character) => {
    const card = document.createElement("article");
    card.classList.add("card");

    const cardImg = document.createElement("img");
    cardImg.src = character.image;
    cardImg.alt = character.name;

    const name = document.createElement("h2");
    name.textContent = character.name;

    const info = document.createElement("p");
    info.textContent = `${character.status} - ${character.species}`;

    //appending the tags to the card, making the card
    card.appendChild(cardImg);
    card.appendChild(name);
    card.appendChild(info);
    //appending the card to an Id in our index.html
    //to reveal the card we created.
    result.appendChild(card);
}
// this is for loading the card
const loadCharacter = async (id) => {
    //1 before: clears old card
    status.textContent = "Loading...";
    result.textContent = "";

    try {
        //2. If getCharacter throws, we jump straight to catch
        const character = await getCharacter(id);
        createCharacter(character);

    } catch (error) {
        //3. every error lands here. log it for us, show a message for our users
        console.log(error);
        status.classList.add("error");

        status.textContent = error.message;
    }


};

searchForm.addEventListener("submit", (event) => {
      event.preventDefault(); // stops form from reloading

      const id = searchInput.value.trim();

      if(id === ""){
        status.textContent = "Type an ID first.";
        status.classList.add("error");
        return;
      }

      loadCharacter(id);
});


goodButton.addEventListener("click", () => {
    loadCharacter(1);
});

badButton.addEventListener("click", () => {
    loadCharacter(9999);
});