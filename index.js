async function getProducts() {
    try{
        const res = await fetch("http://localhost:5000/products");
        const dataa = await res.json();
        const { data } = dataa;

        return data;
    }
    catch(err){
        console.log(err);
    }
}

async function writeProducts() {
    const productListElement = document.getElementById("products-list");

    try{
        const products = await getProducts();
        console.log(products);

        products.forEach(element => {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");

            cardElement.addEventListener("click", () => {
                window.location.href = `product.html?id=${element.id}`;
            });

            const cardImageElement = document.createElement("div");
            cardImageElement.classList.add("card__image");
            
            const cardImage = document.createElement("img");
            cardImage.setAttribute("src", element.image);
            cardImageElement.appendChild(cardImage);

            const cardInfoElement = document.createElement("div");
            cardInfoElement.classList.add("card__info");
            
            const cardTitle = document.createElement("h3");
            cardTitle.classList.add("card__title");
            cardTitle.textContent = element.name;
            
            const cardPrice = document.createElement("span");
            cardPrice.classList.add("card__price");
            cardPrice.textContent = element.price;

            cardInfoElement.appendChild(cardTitle);
            cardInfoElement.appendChild(cardPrice);

            cardElement.appendChild(cardImageElement);
            cardElement.appendChild(cardInfoElement);
            productListElement.appendChild(cardElement);
        });
    }
    catch(err){
        console.log(err);
    }
}

writeProducts();