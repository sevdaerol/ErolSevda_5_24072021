//declarer l'id avec searchparams
let params = (new URL(document.location)).searchParams;
let id = params.get('id');

//declarer les constante
const productPageImg = document.querySelector(".img");
const productPageTitle = document.querySelector(".product_container_infos_title");
const productPageDescription = document.querySelector(".product_container_infos_description");
const productPagePrice = document.querySelector(".product_container_infos_price");
const camQuantity = document.querySelector("#camNumber");
const camLenses = document.querySelector("#lenses_select")

main();  //call function

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
    const addConfirmation = document.querySelector(".product_container_add_confirmation");
    const textConfirmation = document.querySelector(".product_container_confirmation_text");

    //on ajoute un evenement "click" pouir l'envoi vers le panier
    addToCartBtn.addEventListener("click", () => {       //au click
        if (camQuantity.value > 0 && camQuantity.value < 10) {     // operateur "ET logique" si superieur a 0 et inferieur a 10
            let addProduct = {                                   //ajoute au panier ceci
                name: productPageTitle.innerHTML,
                price: parseFloat(productPagePrice.innerHTML),    //"parsefloat" nombreflottant; pour transformer chaine de caractere
                quantity: parseFloat(document.querySelector("#camNumber").value),
                _id: id,
            };
//------------------LocalStorage-------------------------------------------------------
           
            let arrayArticlesInCart = [];   //tableau localstorage
            
            if (localStorage.getItem("articles") !== null) {
                arrayArticlesInCart = JSON.parse(localStorage.getItem("articles")); //recuperer les valeurs stockee
            }
             
                arrayArticlesInCart.push(addProduct);   //envoyer vers panier
                localStorage.setItem("articles", JSON.stringify(arrayArticlesInCart)); //stocker cle/valeur localstorage
                //si produit ajouter au panier afficher confirmation
                addConfirmation.style.visibility = "visible";
                textConfirmation.innerHTML = `${camQuantity.value} article ajouté au panier!`;
                textConfirmation.style.color = "white";
                //executer un settimeout pour le delais d'affichage de message de confirmation
                setTimeout("location.reload(true);", 5000);
        } else { //si non afficher ce message
             addConfirmation.style.visibility = "visible";
             textConfirmation.style.background = "red";
             textConfirmation.style.border = "red";
             textConfirmation.innerHTML = `Sélectionner une quantité. Attention, vous ne pouvez pas ajouter plus de 10 articles!`;
             textConfirmation.style.color = "white";
        }
    });
}
console.log("ok!");