let cart = document.querySelector(".cart_filled_details");
let copyLocalStorage = JSON.parse(localStorage.getItem("articles")); //copier le tableau local storage

main(); //function call

function main() {
    viewCart();
    forEmptyCart();
    totalOfCart();
}

function viewCart() {
    let filledCart = document.querySelector(".cart_filled");
    let ifempty = document.querySelector(".empty_cart_case"); //vider le panier
    let totalTest = document.querySelector(".total");
    let emptyCart = document.querySelector(".cart_empty"); //si le panier est vide
    let orderCart = document.querySelector(".cart_order"); //form
    let filledCartDetails = document.querySelector(".cart_filled_details");

    // si il ya un objet dans localstorage => afficher dans l'emplacement cree et masquer element .cart_empty
    if (localStorage.getItem("articles")) {
        filledCart.style.display = "flex";
        filledCart.style.flexDirection = "column";
        filledCart.style.justifyContent = "space-between";
        filledCart.style.backgroundColor = "white";
        filledCart.style.padding = "2%";
        filledCart.style.height = "90%";
        filledCart.style.width = "75%";
        emptyCart.style.display = "none";
    } else { 
        orderCart.style.display = "none";
        filledCartDetails.style.display ="none";
    }

    //creer emplacement pour les donnees recu du tableau localstorage
    for (let article in copyLocalStorage) {
        let productInCart = document.createElement("div");
        cart.insertBefore(productInCart, ifempty);  //bouton vider le panier aavnt les produits dans le panier
        cart.insertBefore(totalTest, ifempty); //total avant le bouton vider panier
        productInCart.classList.add("cart_filled_informations");

        let productName = document.createElement("div");
        productInCart.appendChild(productName);
        productName.classList.add("cart_filled_informations_title");
        productName.innerHTML = copyLocalStorage[article].name;

        let productQuantity = document.createElement("div");
        productInCart.appendChild(productQuantity);
        productQuantity.classList.add("cart_filled_informations_quantity");
        productQuantity.innerHTML = copyLocalStorage[article].quantity;

        let productPrice = document.createElement("div");
        productInCart.appendChild(productPrice);
        productPrice.classList.add("cart_filled_informations_price");
        productPrice.innerHTML = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR",}).format(copyLocalStorage[article].price * copyLocalStorage[article].quantity);
        //reformater prix + nouvelle methode pour calculer total de plusieurs quantitees
    }
}

//creer fonction pour total du panier!!!!!
function totalOfCart() {
    let arrayForPrice = [];
    let priceTotal = document.querySelector(".total");
    let productPriceQuantityTest = document.querySelector(".price");

    for (let price in productPriceQuantityTest) {
        arrayForPrice.push(productPriceQuantityTest[price].innerHTML); // on push le prix dans le panier dans le tableau
    }

    arrayForPrice = arrayForPrice.filter((el) => { //enlever les undefined
        return el != undefined;
    });

    arrayForPrice = arrayForPrice.map((x) => parseFloat(x));  //transformer en nombre tout les valeurs du tableau

    //const reducer = (acc, currentVal) => acc + currentVal;
    //arrayForPrice = arrayForPrice.reduce(reducer);
    //additionner les avleurs pour avoir le total
    

    priceTotal.innerText = `Total : ${(arrayForPrice = new Intl.NumberFormat("fr-FR",{style: "currency", currency: "EUR",}).format(arrayForPrice))}`;
    

}

//cree fonction puis ajouter un evenement pour vider le panier au click!
function forEmptyCart() {
const btnForEmptyCart = document.querySelector(".empty_cart_btn");
btnForEmptyCart.addEventListener("click", () => {
    localStorage.clear();
});
}


//creer fonction pour soumettre le formulaire


console.log("ok!");
