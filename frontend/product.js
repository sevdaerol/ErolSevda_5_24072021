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