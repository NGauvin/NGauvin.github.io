const base_url = "https://ngauvin.github.io/json/";

//get the list of assets from the json file
const getAssets = async() => {
    const url = `${base_url}alternatives.json`;
    const response = await fetch(url);
    return response.json();
};

//show each asset as a card on the page
const showAssets = async() => {
    const assetList = document.getElementById("asset-cards");

    try {
        const assets = await getAssets();
        assetList.innerHTML = "";

        assets.forEach((asset)=>{
            assetList.append(displayAsset(asset));
        });
    } catch (error) {
        assetList.innerHTML = "<p class='asset-status'>Sorry, we couldn't load the asset classes.</p>";
    }
};

//build the html for one asset card
const displayAsset = (asset) => {
    const section = document.createElement("section");
    section.classList.add("asset-card");

    const img = document.createElement("img");
    img.classList.add("asset-card-img");
    img.src = asset.img_name;
    img.alt = `Picture of ${asset.name}`;
    section.append(img);

    const body = document.createElement("div");
    body.classList.add("asset-card-body");
    section.append(body);

    const header = document.createElement("div");
    header.classList.add("asset-card-header");
    header.innerHTML = `<h3>${asset.name}</h3><span class="asset-tag">${asset.risk} Risk</span>`;
    body.append(header);

    const category = document.createElement("span");
    category.classList.add("asset-category");
    category.innerHTML = asset.category;
    body.append(category);

    const description = document.createElement("p");
    description.innerHTML = asset.description;
    body.append(description);

    const footer = document.createElement("div");
    footer.classList.add("asset-card-footer");
    footer.append(createMetric("Typical Return", asset.typical_return));
    footer.append(createMetric("Liquidity", asset.liquidity));
    body.append(footer);

    return section;
};

//build one label and value pair for the bottom of a card
const createMetric = (label, value) => {
    const div = document.createElement("div");
    div.innerHTML = `<span class="metric-label">${label}</span><span class="metric-value">${value}</span>`;
    return div;
};

showAssets();