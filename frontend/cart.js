let cart = document.querySelector(".cart_filled_details");
let copyLocalStorage = JSON.parse(localStorage.getItem("articles")); //copier le tableau local storage

main(); //function call

function main() {
    viewCart();
    forEmptyCart();
    totalOfCart();
    submitForm();
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
        filledCart.style.margin = "3%";
        filledCart.style.width = "75%";
        emptyCart.style.display = "none";
    } else { 
        orderCart.style.display = "none";
        filledCartDetails.style.display ="none";
        filledCart.style.height = "85vh";
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
        productPrice.classList.add("cart_filled_informations_price", "price");
        productPrice.innerHTML = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR",}).format(copyLocalStorage[article].price * copyLocalStorage[article].quantity);
        //reformater prix + nouvelle methode pour calculer total de plusieurs quantitees
    }
}

//fonction pour total du panier!!!!!
function totalOfCart() {
    let arrayForPrice = [];
    let priceTotal = document.querySelector(".total");
    let pushEachPriceToArray = document.querySelector(".price");

    for (let price in pushEachPriceToArray) {
        arrayForPrice.push(pushEachPriceToArray[price].innerHTML); // on push le prix le tableau
    }

    arrayForPrice = arrayForPrice.filter((el) => { //enlever les undefined
        return el != undefined;
    });
   
    arrayForPrice = arrayForPrice.map((x) => parseFloat(x));  //transformer en nombre tout les valeurs du tableau
   
    const reducer = (accumulator, currentVal) => accumulator + currentVal;  //additionner le nombre total
    arrayForPrice = arrayForPrice.reduce(reducer);
    
    priceTotal.innerText = `Total : ${(arrayForPrice = new Intl.NumberFormat("fr-FR",{style: "currency", currency: "EUR",}).format(arrayForPrice))}`;

}

//cree fonction puis ajouter un evenement pour vider le panier au click!
function forEmptyCart() {
const btnForEmptyCart = document.querySelector(".empty_cart_btn");
btnForEmptyCart.addEventListener("click", () => {
    localStorage.clear();
});
}

//fonction pour soumettre le formulaire
function submitForm () {
    const submit = document.querySelector("#submit"); 
    let inputName = document.querySelector("#name");
    let inputLastname = document.querySelector("#lastname");
    let inputMail = document.querySelector("#mail");
    let inputStreet = document.querySelector("#street");
    let inputCity = document.querySelector("#city");
    let inputPostal = document.querySelector("#postal");
    let ifError = document.querySelector(".error_case");

    //au click si un champs n'est pas renseigner.. 
    submit.addEventListener("click", (e) => {
        if (
            !inputName.value ||
            !inputLastname.value ||
            !inputMail.value ||
            !inputStreet.value ||
            !inputCity.value ||
            !inputPostal.value 
        )
        
        {
            ifError.innerHTML = "Renseigner tout les champs!"; //..alors afficher message d'erreur
            e.preventDefault();
        }  
        
        else { 
            let boughtArticles = []; //tableau des produits acheter
            boughtArticles.push(copyLocalStorage);
            //tableau + objets infos 
            const order = {
                contact: {
                    firstName: inputName.value,
                    lastName: inputLastname.value,
                    adress: inputStreet.value,
                    city: inputCity.value,
                    email: inputMail.value,
                },
                boughts: boughtArticles,
            };

            //requete post au backend!
            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/Json"},
            };

            //formater prix pour l'affichage
            let totalConfirmation = document.querySelector(".total").innerText;
            totalConfirmation = totalConfirmation.split(" :");

            //envoi de la requete vers la page de confirmation
            //fetch("http://localhost:3000/api/cameras/order", options)
            //.then((Response) => Response.json())
            //.then((data) => {
                localStorage.clear();
                console.log(data)
                localStorage.setItem("orderId", data.orderId);
                localStorage.setItem("total", totalConfirmation[1]);
                //verifier le statut de la requete
                document.location.href = "confirmation.html";
            //})
        }
    });
}
console.log("ok!");