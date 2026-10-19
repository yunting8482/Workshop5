// WS05 student starter / opiskelijan aloituspohja
// Complete the TODOs. This file is intentionally unfinished.
// Täydennä TODO-kohdat. Tämä tiedosto on tarkoituksella keskeneräinen.

const animalForm = document.getElementById("animalForm");
const animalName = document.getElementById("animalName");
const animalSpecies = document.getElementById("animalSpecies");
const careNote = document.getElementById("careNote");
const nameError = document.getElementById("nameError");
const speciesError = document.getElementById("speciesError");
const noteError = document.getElementById("noteError");
const formResult = document.getElementById("formResult");

// Exercises 1 and 3 / Harjoitukset 1 ja 3
animalForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // TODO: Clear previous errors / Tyhjennä edelliset virheet.

    nameError.textContent="";
    speciesError.textContent="";
    noteError.textContent="";
    formResult.textContent="";
    animalName.classList.remove("invalid");
    animalSpecies.classList.remove("invalid");
    careNote.classList.remove("invalid");

    // TODO: Read and trim values / Lue ja trimmaa kenttien arvot.

    const name=animalName.value.trim();
    const species=animalSpecies.value.trim();
    const note=careNote.value.trim();

    // TODO: Validate and show errors / Validoi ja näytä virheet.

    let isValid=true;
    if(name===""){
        nameError.textContent="Please enter the animal name.";
        animalName.classList.add("invalid");
        isValid=false;
    
    }
    if(species===""){
        speciesError.textContent="Please enter the species.";
        animalSpecies.classList.add("invalid");
        isValid=false;
    } 
    if(note.length<1){
        noteError.textContent="Please enter a care note from 1-150 characters.";
        careNote.classList.add("invalid");
        isValid=false;
    
    }else if(note.length>150){
        noteError.textContent="The care note is too long,note should be less than 150 characters.";
        careNote.classList.add("invalid");
        isValid=false;

    }

    if(!isValid){
        return;
    }
    // TODO: If valid, show the result / Näytä hyväksytty tulos.
    console.log("Valid animal:",name,species,note);
    formResult.textContent='Added:${name} (${species}) - ${note}';
    // TODO: Create { name, species, note } and save it as JSON.
    const animal={name:name,species:species,note:note};
    localStorage.setItem("ws05Animal",JSON.stringify(animal));
    animalForm.reset();

    
    // TODO: Luo { name, species, note } ja tallenna se JSON-tekstinä.
});

// Exercise 2 / Harjoitus 2
const sponsorForm = document.getElementById("sponsorForm");
const animalType = document.getElementById("animalType");
const yearsInput = document.getElementById("years");
const cost = document.getElementById("cost");
const discountMessage = document.getElementById("discountMessage");

sponsorForm.addEventListener("submit", function (event) {
    event.preventDefault();
    // TODO: Convert input values with Number().
    const annualFee=Number(animalType.value);
    const years=Number(yearsInput.value);
    if(yearsInput.value.trim()==="")||!Number.isInteger(years)||years<1{
        cost.textContent="Total:not calculated yet.";
        discountMessage.textContent="Please enter a positive whole numbers of years.";
        return;
    }
    // TODO: Muunna syötteet numeroiksi Number()-funktiolla.
    // TODO: Calculate the price and apply discounts.
    const baseTotal=annualFee*years;
    let total=baseTotal;
    const messages=[];
    if(years>2){
        const percentDiscount=baseTotal*0.2;
        total=total-percentDiscount;
        messages.push("20% discount:-\u20AC"+percentDiscount.toFixed(2));
    }
    if(years>=5){
        total=total-5;
        messages.push("Extra discount for 5 + years:-\u20AC5.00");

    }
    // TODO: Laske hinta ja alennukset.
    // TODO: Show the result / Näytä tulos.
    cost.textContent="Total:\u20AC"+total.toFixed(2);
    if(messages.length>0){
        discountMessage.textContent=messages.join(".")+".";
    }else{
        discountMessage.textContent="No discocunt(discount start above 2 years.)";
    }
});

// Exercise 4 / Harjoitus 4
const loadButton = document.getElementById("loadAnimal");
const clearButton = document.getElementById("clearAnimal");
const savedAnimal = document.getElementById("savedAnimal");

function loadAnimal() {
    // TODO: Read ws05Animal. Handle null before using JSON.parse().
    const saved=localStorage.getItem("ws05Animal");
    if(saved===null){
        savedAnimal.textContent="No saved animal yet";
        return;
    }
    // TODO: Lue ws05Animal. Tarkista null ennen JSON.parse()-muunnosta.
    // TODO: Display name, species and note with textContent.
    const animal=JSON.parse(saved);
    savedAnimal.textContent=
    "Name:"+animal.name+"|Species:"+animal.species+"|Carenote:"+animal.note;
    // TODO: Näytä nimi, laji ja muistio textContent-ominaisuudella.
}

loadButton.addEventListener("click", loadAnimal);
clearButton.addEventListener("click", function () {
    // TODO: Remove ws05Animal and update the displayed result.
    localStorage.removeItem("ws05Animal");
    loadAnimal();
    // TODO: Poista ws05Animal ja päivitä sivulla näkyvä tulos.
});

// TODO: Call loadAnimal() here to restore data when the page opens.
loadAnimal();
// TODO: Kutsu loadAnimal() tässä, jotta tiedot palautuvat sivun avautuessa.
