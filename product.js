async function getProductById(id) {
    try{
        const res = await fetch(`http://localhost:5000/products/${id}`);
        const dataa = await res.json();
        const { data } = dataa;

        return data;
    }
    catch(err){
        console.log(err);
    }
}

async function writeProductDetail() {
    const productDetailElement = document.getElementById("product-detail");

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        console.log("ID topilmadi");
        return;
    }

    try{
        const product = await getProductById(productId);
        console.log(product);

        const detailCardElement = document.createElement("div");
        detailCardElement.classList.add("detail-card");

        const detailImageElement = document.createElement("div");
        detailImageElement.classList.add("detail__image");
        
        const detailImage = document.createElement("img");
        detailImage.setAttribute("src", product.image);
        detailImageElement.appendChild(detailImage);

        const detailInfoElement = document.createElement("div");
        detailInfoElement.classList.add("detail__info");
        
        const detailTitle = document.createElement("h2");
        detailTitle.classList.add("detail__title");
        detailTitle.textContent = product.name;
        
        const detailCategory = document.createElement("span");
        detailCategory.classList.add("detail__category");
        detailCategory.textContent = `Category: ${product.category}`;
        
        const detailPrice = document.createElement("span");
        detailPrice.classList.add("detail__price");
        detailPrice.textContent = `Price: $${product.price}`;
        
        const detailDescription = document.createElement("p");
        detailDescription.classList.add("detail__description");
        detailDescription.textContent = product.description;
        
        const detailStock = document.createElement("span");
        detailStock.classList.add("detail__stock");
        detailStock.textContent = `Stock: ${product.stock}`;
        
        const detailRating = document.createElement("span");
        detailRating.classList.add("detail__rating");
        detailRating.textContent = `Rating: ${product.rating}`;

        detailInfoElement.appendChild(detailTitle);
        detailInfoElement.appendChild(detailCategory);
        detailInfoElement.appendChild(detailPrice);
        detailInfoElement.appendChild(detailDescription);
        detailInfoElement.appendChild(detailStock);
        detailInfoElement.appendChild(detailRating);

        detailCardElement.appendChild(detailImageElement);
        detailCardElement.appendChild(detailInfoElement);
        productDetailElement.appendChild(detailCardElement);
    }
    catch(err){
        console.log(err);
    }
}

writeProductDetail();