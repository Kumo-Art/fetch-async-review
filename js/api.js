const BASE_URL = "https://rickandmortyapi.com/api/character";

// Fetch one character by ID.
// getCharacter(1) -> Rick Sanchez
// getCharacter(9999) -> throws "No character with that ID...."
export const getCharacter = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`);
    console.log(res.status, res.ok);
    

    // A 404 or 500 does NOT throw, so we check and throw ourselves
    // these errors travel back to the try/ catch that will be in our script.js
    if (res.status === 404) {
        throw new Error("No character with that ID. try 1 to 826.")
    }

    if(!res.ok){
        throw new Error(`Server error: ${res.status}`);
    }

    return await res.json()
}