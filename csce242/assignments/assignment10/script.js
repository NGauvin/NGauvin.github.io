//associative array (object) for mountain destinations
const mountains = {
    "Ashville": "https://maps.google.com/maps?q=Asheville,%20NC&t=&z=12&ie=UTF8&iwloc=&output=embed",
    "Boone": "https://maps.google.com/maps?q=Boone,%20NC&t=&z=12&ie=UTF8&iwloc=&output=embed",
    "Hot Springs": "https://maps.google.com/maps?q=Hot%20Springs,%20NC&t=&z=12&ie=UTF8&iwloc=&output=embed",
    "Table Rock": "https://maps.google.com/maps?q=Table%20Rock,%20SC&t=&z=12&ie=UTF8&iwloc=&output=embed"
};

//associative array (object) for beach destinations
const beaches = {
    "Myrtle Beach": "https://maps.google.com/maps?q=Myrtle%20Beach,%20SC&t=&z=12&ie=UTF8&iwloc=&output=embed",
    "Hilton Head": "https://maps.google.com/maps?q=Hilton%20Head%20Island,%20SC&t=&z=12&ie=UTF8&iwloc=&output=embed",
    "Folly Beach": "https://maps.google.com/maps?q=Folly%20Beach,%20SC&t=&z=12&ie=UTF8&iwloc=&output=embed",
    "Wrightsville Beach": "https://maps.google.com/maps?q=Wrightsville%20Beach,%20NC&t=&z=12&ie=UTF8&iwloc=&output=embed"
};

//displays list of destination links based on selected type
const displayDestinations = (categoryData) => {
    const listContainer = document.getElementById("destination-list");
    listContainer.innerHTML = "";

    //loop through associative array keys
    for (let destination in categoryData) {
        const link = document.createElement("a");
        link.innerHTML = destination;
        link.href = "#";

        //when link is clicked load live map iframe
        link.onclick = (e) => {
            e.preventDefault();
            showMap(categoryData[destination]);
        };

        listContainer.appendChild(link);
    }
};

//shows google map in iframe
const showMap = (mapUrl) => {
    const mapContainer = document.getElementById("map-container");
    const mapIframe = document.getElementById("map-iframe");

    mapIframe.src = mapUrl;
    mapContainer.classList.add("visible");
};

//hides map and clears destination links
const hideMapAndList = () => {
    const mapContainer = document.getElementById("map-container");
    const mapIframe = document.getElementById("map-iframe");
    const listContainer = document.getElementById("destination-list");

    mapIframe.src = "";
    mapContainer.classList.remove("visible");
    listContainer.innerHTML = "";
};

//when dropdown selection changes
document.getElementById("destination-type").onchange = (e) => {
    const selectedValue = e.target.value;

    hideMapAndList();

    if (selectedValue === "mountains") {
        displayDestinations(mountains);
    } else if (selectedValue === "beaches") {
        displayDestinations(beaches);
    }
};