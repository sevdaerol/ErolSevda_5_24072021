//declarer l'id avec searchparams
let params = (new URL(document.location)).searchParams;
let id = params.get('id');

//declarer les variables
const productPageImg = document.querySelector(".img");
const productPageTitle = document.querySelector(".product_container_infos_title");
const productPageDescription = document.querySelector(".product_container_infos_description");
const productPagePrice = document.querySelector(".product_container_infos_price");
const camQuantity = document.querySelector("#camNumber");
const camLenses = document.querySelector("#lenses_select")

main();

function main() {
    getArticles();
    addToCart();
}
//Recuperation du produit selectionnee seulement avec le lien api plus "l'id" 
function getArticles() {
    fetch(`http://localhost:3000/api/cameras/${id}`) //guillemets avec la touche 7 important pour le fonctionnement de l'id
    .then(function (response) {
        return response.json();
    })
    .catch((error) => {
        let errorMessage = document.querySelector(".product_container");
        errorMessage.innerHTML = "Une erreur est survenue.Réessayer plustard!";
    }
    )

//affichage&placement des informations 
    .then (function (resultsApi){
    article = resultsApi;
    productPageImg.src = article.imageUrl;
    productPageTitle.innerHTML = article.name;
    productPageDescription.innerText = article.description;
    //REFORMATER prix!!!
    article.price = article.price / 100;
    productPagePrice.innerText = new Intl.NumberFormat("fr-FR", {style: "currency",currency: "eur",}).format(article.price);
    
    // creer boucle pour les options lentilles
    let camLenses = document.getElementById("lenses_select");
    for (let i = 0; i < article.lenses.length; i++) {
        let option = document.createElement("option");
        option.innerText = article.lenses[i];
        camLenses.appendChild(option); //creer option pour les lentilles, est enfant de #lenses_select
        }
    });
}

// ----------------------------------------nouvelle fonction pour l'ajout au panier---------------------------
function addToCart() {
    const addToCartBtn = document.querySelector(".product_container_button_addCart");
    //on ajoute un evenement "click" pouir l'envoi vers le panier
    addToCartBtn.addEventListener("click", () => {       //au click
        if (camQuantity.value > 0 && camQuantity.value < 10) {     // operateur "ET logique" si superieur a 0 et inferieur a 10
            let addProduct = {                                   //ajoute au panier ceci
                name: productPageTitle.innerHTML,
                price: parseFloat(productPagePrice.innerHTML),
                quantity: parseFloat(document.querySelector("#camNumber").value),
                _id: id,
            };

            //tableau localstorage
            let arrayProductsInCart = [];



        }
    })

}