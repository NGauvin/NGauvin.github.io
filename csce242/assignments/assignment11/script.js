// Vacation Class
class Vacation {
    constructor(title, type, description, thingsToDo, imageFile, mapSrc) {
        this.title = title;
        this.type = type;
        this.description = description;
        this.thingsToDo = thingsToDo;
        this.imageFile = imageFile;
        this.mapSrc = mapSrc;
    }

    // Returns html card string for gallery
    getCardHtml(index) {
        return '<div class="vacation-card" onclick="openModal(' + index + ')">' +
            '<div class="card-header">' +
                '<h3>' + this.title + '</h3>' +
                '<p>' + this.type + ' Vacation</p>' +
            '</div>' +
            '<img src="images/' + this.imageFile + '" alt="' + this.title + '" class="card-image">' +
        '</div>';
    }
}

// Array of Vacations
const vacations = [
    new Vacation(
        "Asheville",
        "Mountain",
        "A vibrant mountain city known for its historic Biltmore Estate and lively arts scene.",
        "Visit Biltmore Estate, drive the Blue Ridge Parkway, explore downtown galleries.",
        "asheville.jpg",
        "https://maps.google.com/maps?q=Asheville,NC&t=&z=12&ie=UTF8&iwloc=&output=embed"
    ),
    new Vacation(
        "Boone",
        "Mountain",
        "A scenic college town in the Blue Ridge Mountains with beautiful hiking and skiing.",
        "Go skiing, visit Appalachian State University, hike Grandfather Mountain.",
        "boone.jpg",
        "https://maps.google.com/maps?q=Boone,NC&t=&z=12&ie=UTF8&iwloc=&output=embed"
    ),
    new Vacation(
        "Hot Springs",
        "Mountain",
        "A quiet mountain town famous for natural mineral hot springs and outdoor recreation.",
        "Soak in hot springs, hike the Appalachian Trail, go white water rafting.",
        "hotsprings.jpg",
        "https://maps.google.com/maps?q=Hot+Springs,NC&t=&z=12&ie=UTF8&iwloc=&output=embed"
    ),
    new Vacation(
        "Table Rock",
        "Mountain",
        "A breathtaking state park featuring steep hikes and vast views of the foothills.",
        "Hike Table Rock Trail, camp under the stars, go kayaking on Pinnacle Lake.",
        "tablerock.jpg",
        "https://maps.google.com/maps?q=Table+Rock+State+Park,SC&t=&z=12&ie=UTF8&iwloc=&output=embed"
    ),
    new Vacation(
        "Sunset Beach",
        "Beach",
        "A peaceful beach town with white sandy shores and beautiful sunset ocean views.",
        "Walk the pier, visit Kindred Spirit Mailbox, search for sea shells.",
        "sunsetbeach.jpg",
        "https://maps.google.com/maps?q=Sunset+Beach,NC&t=&z=12&ie=UTF8&iwloc=&output=embed"
    ),
    new Vacation(
        "Edisto Beach",
        "Beach",
        "A quiet, family-friendly beach area rich in coastal wildlife and natural beauty.",
        "Go fishing, collect shark teeth, visit Edisto Beach State Park.",
        "edistobeach.jpg",
        "https://maps.google.com/maps?q=Edisto+Beach,SC&t=&z=12&ie=UTF8&iwloc=&output=embed"
    ),
    new Vacation(
        "Oak Island",
        "Beach",
        "A classic beach destination featuring fishing piers, golfing, and wide beaches.",
        "Visit Oak Island Lighthouse, go fishing off the pier, play beach volleyball.",
        "oakisland.jpg",
        "https://maps.google.com/maps?q=Oak+Island,NC&t=&z=12&ie=UTF8&iwloc=&output=embed"
    ),
    new Vacation(
        "Pawleys Island",
        "Beach",
        "A historic island destination famous for its relaxed lifestyle and historic homes.",
        "Relax on the beach, go crabbing, shop at Hammock Shops Village.",
        "pawleysisland.jpg",
        "https://maps.google.com/maps?q=Pawleys+Island,SC&t=&z=12&ie=UTF8&iwloc=&output=embed"
    )
];

// Load cards into DOM
function displayVacations() {
    const gallery = document.getElementById("vacation-gallery");
    let galleryHtml = "";

    for (let i = 0; i < vacations.length; i++) {
        galleryHtml += vacations[i].getCardHtml(i);
    }

    gallery.innerHTML = galleryHtml;
}

// Modal control functions
function openModal(index) {
    const vacation = vacations[index];

    document.getElementById("modal-title").innerText = vacation.title;
    document.getElementById("modal-type").innerText = vacation.type;
    document.getElementById("modal-description").innerText = vacation.description;
    document.getElementById("modal-things").innerText = vacation.thingsToDo;
    document.getElementById("modal-map").src = vacation.mapSrc;

    document.getElementById("vacation-modal").style.display = "block";
}

function closeModal() {
    document.getElementById("vacation-modal").style.display = "none";
    document.getElementById("modal-map").src = "";
}

// Event listener to start code when page loads
window.onload = displayVacations;