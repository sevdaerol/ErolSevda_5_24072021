//extraire l'id avec l'objet window propriete location => la propriete search pour recuperer tout ce qui est apres le point d'interogation
const params = (new URL(document.location)).searchParams;
let id = params.get('id'); //get 'id' car qu'on avait nommee 'id' dans index <a> 
//console.log(id);

//************une autre facon de recupere l'id*******
//const params = window.location.search;
//console.log(params);
//methode pour extraire le point d'interogation
//const slice = params.slice(1);

//declarer les constante
const productPageImg = document.querySelector(".img");
const productPageTitle = document.querySelector(".product_container_infos_title");
const productPageDescription = document.querySelector(".product_container_infos_description");
const productPagePrice = document.querySelector(".product_container_infos_price");
const camQuantity = document.querySelector("#camNumber");

main();  //call function

function main() {
    getArticles();
    addToCart();
}
//Recuperation du produit selectionnee seulement avec le lien api plus "l'id" 
function getArticles() {
    let getID  = fetch(`http://localhost:3000/api/cameras/${id}`); //guillemets avec la touche 7 , recuperer l'id avec la variable id
    console.log(getID);
    getID 
        //affichage&placement des donnees du produit selectionee 
        .then (async (resultsApi) => {
            article = await resultsApi.json();
            console.log(article);
            productPageImg.src = article.imageUrl;
            productPageTitle.innerText = article.name;
            productPageDescription.innerText = article.description;
            productPagePrice.price = article.price / 100;
            //REFORMATER prix!!!
            productPagePrice.innerText = new Intl.NumberFormat("fr-FR", {style: "currency",currency: "EUR",}).format(article.price/100);
            // creer boucle pour les options lentilles
            let camLenses = document.getElementById("lenses_select");
            for (let i = 0; i < article.lenses.length; i++) {
                let option = document.createElement("option");
                option.innerText = article.lenses[i];
                camLenses.appendChild(option); //creer option pour les lentilles, est enfant de #lenses_select
                }
            })
        .catch((error) => {
            let errorMessage = document.querySelector(".product_container");
            errorMessage.innerHTML = "Une erreur est survenue.Réessayer plustard!";
        })
}
//****************nouvelle fonction pour l'ajout au panier**********************

function addToCart() {
    const addToCartBtn = document.querySelector(".product_container_button_addCart");
    const addConfirmation = document.querySelector(".product_container_add_confirmation");
    const textConfirmation = document.querySelector(".product_container_confirmation_text");

    //on ajoute un evenement "click" pour l'envoi vers localstorage
    addToCartBtn.addEventListener("click", (e) => {
        e.preventDefault(); // au click ne permet de reactualiser la page
        //recuperer les valeurs de l'objet selectionnee pour l'envoi au panier
        if (camQuantity.value > 0 && camQuantity.value < 10) { 
            let addProduct = {                                   
                name: productPageTitle.innerHTML ,
                price: productPagePrice.price,
                quantity: parseFloat(document.querySelector("#camNumber").value),
                _id: id,
            };
            console.log(addProduct);
           // console.log("- " +addProduct.name);
           // console.log("- " +addProduct.price);
           // console.log("- " +addProduct.quantity);
           // console.log("- " +addProduct._id);

//*************LocalStorage********************************* 
            //la variable pour mettre les key et les values qui sont dans le local storage 
            let arrayArticlesInCart = JSON.parse(localStorage.getItem("articles")); //JSON.parse => pour convertir les objets javascripts dans le local storage a des donnees au format JSON
            //console.log(arrayArticlesInCart);

            if (!arrayArticlesInCart){
                //si localstorage vide, dabbord on cree un tableau
                arrayArticlesInCart = [];
            }
            //dans tout les cas ajouter le produit selectionnee
            arrayArticlesInCart.push(addProduct);
            localStorage.setItem(addProduct._id, JSON.stringify(addProduct));
            console.log(arrayArticlesInCart);
            //console.log("apres ajout nombre de ptoduits dans panier :" +arrayArticlesInCart.length);

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