let cart = document.querySelector(".cart_filled_details");
let copyLocalStorage = JSON.parse(localStorage.getItem("articles")); //copier le tableau local storage

main(); //function call

function main() {
    viewCart();
    forEmptyCart();
}

function viewCart() {
    let filledCart = document.querySelector(".cart_filled");
    let ifempty = document.querySelector(".empty_cart_case");
    let emptyCart = document.querySelector(".cart_empty");

    // si il ya un objet dans localstorage => afficher dans l'emplacement cree et masquer element .cart_empty
    if (localStorage.getItem("articles")) {
        filledCart.style.display = "flex";
        filledCart.style.flexDirection = "column";
        filledCart.style.justifyContent = "space-around"
        emptyCart.style.display ="none";
    }

    //creer emplacement pour les donnees recu du tableau localstorage
    for (let article in copyLocalStorage) {
        let productInCart = document.createElement("div");
        cart.insertBefore(productInCart, ifempty);
        productInCart.classList.add("cart_filled_informations");

        let productName = document.createElement("div");
        productInCart.appendChild(productName);
        productName.classList.add(".cart_filled_informations_title");
        productName.innerHTML = copyLocalStorage[article].name;

        let productQuantity = document.createElement("div");
        productInCart.appendChild(productQuantity);
        productQuantity.classList.add(".cart_filled_informations_quantity");
        productQuantity.innerHTML = copyLocalStorage[article].quantity;

        let productPrice = document.createElement("div");
        productInCart.appendChild(productPrice);
        productPrice.classList.add(".cart_filled_informations_price");
        productPrice.innerHTML = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR",}).format(copyLocalStorage[article].price * copyLocalStorage[article].quantity);
        //reformater prix + nouvelle methode pour calculer total de plusieurs quantitees
    }
}

//creer fonction pour total du panier!!!!!


//cree fonction puis ajouter un evenement pour vider le panier au click!
function forEmptyCart() {
const btnForEmptyCart = document.querySelector(".empty_cart_btn");
btnForEmptyCart.addEventListener("click", () => {
    localStorage.clear();
});
}


//creer fonction pour soumettre le formulaire
console.log("ok!");
