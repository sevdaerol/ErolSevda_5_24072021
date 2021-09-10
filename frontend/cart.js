let copyLocalStorage = JSON.parse(localStorage.getItem("articles")); //copier le tableau local storage
console.log("ls: " +copyLocalStorage);

main(); //function call

function main() {
    viewCart();
    totalOfCart();
    forEmptyCart();
    submitForm();
}

function viewCart() {
    let filledCart = document.querySelector(".cart_filled");
    let ifempty = document.querySelector(".empty_cart_case"); //vider le panier
    let totalTest = document.querySelector(".total");
    let emptyCart = document.querySelector(".cart_empty"); //si le panier est vide
    let orderCart = document.querySelector(".cart_order"); //form
    let cart = document.querySelector(".cart_filled_details");

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
        cart.style.display ="none";
        filledCart.style.height = "85vh";
    }

    //creer emplacement pour les donnees recu du tableau localstorage
    for (let article = 0; article < copyLocalStorage.length; article++) {
        console.log("article :" +copyLocalStorage);
        let productInCart = document.createElement("div");
        cart.insertBefore(productInCart, ifempty);  //bouton vider le panier aavnt les produits dans le panier
        cart.insertBefore(totalTest, ifempty); //total avant le bouton vider panier
        productInCart.classList.add("cart_filled_informationsjs", "classStyle");
 
        let productName = document.createElement("div");
        productInCart.appendChild(productName);
        productName.classList.add("cart_filled_informations_titlejs", "classStyle");
        productName.innerHTML = copyLocalStorage[article].name;

        let productQuantity = document.createElement("div");
        productInCart.appendChild(productQuantity);
        productQuantity.classList.add("cart_filled_informations_quantityjs", "classStyle" );
        productQuantity.innerHTML = copyLocalStorage[article].quantity;

        let productPrice = document.createElement("div");
        productInCart.appendChild(productPrice);
        productPrice.classList.add("cart_filled_informations_pricejs","classStyle",);
        productPrice.price = copyLocalStorage[article].price;

        productPrice.innerHTML = new Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
        }).format(copyLocalStorage[article].price * copyLocalStorage[article].quantity);
        //reformater prix +  calculer total de plusieurs quantitees
    }
}

//fonction pour total du panier!!!!!
function totalOfCart() {
    let arrayForPrice = [];
    console.log("tableaudeprix: " +arrayForPrice);

    let priceTotal = document.querySelector(".total");
    console.log("total: " +priceTotal);

    let pushEachPriceToArray = document.querySelectorAll(".cart_filled_informations_pricejs");
    console.log("prix: " +pushEachPriceToArray[0]);
    //let pushEachQuantityToArray = document.querySelectorAll(".cart_filled_informations_quantityjs");

    for (let m in pushEachPriceToArray) {
        arrayForPrice.push(pushEachPriceToArray[m].price);
        arrayForPrice.push(pushEachPriceToArray[m].quantity);
        console.log("quantite: " + m.quantity);
    }

    let newArrayForPrice = arrayForPrice.filter((x) => { //enlever les undefined du array => creer un nouvel array pour trier les undefined
        return x !== undefined;
    });
    console.log(newArrayForPrice);

    //newArrayForPrice.map((pushEachPriceToArray) => parseInt(pushEachPriceToArray));  //transformer en nombre tout les valeurs du tableau
   
    const reducerTest = (accumulator, currentVal) => accumulator + currentVal;  //additionner le nombre total
    let totalTest = newArrayForPrice.reduce(reducerTest);
    console.log(totalTest);

    priceTotal.innerText = `Total : ${(totalTest)} €`;
  
}

//fonction: evenement pour vider le panier au click!
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
            let boughtArticles = []; 
            for(let i = 0; i < copyLocalStorage.length; i++){
                boughtArticles.push(copyLocalStorage[i].id);
            }
            console.log("ba: " + boughtArticles);
            //tableau + objets infos 
            const order = {  
                contact: {
                    firstName: inputName.value,
                    lastName: inputLastname.value,
                    adress: inputStreet.value,
                    city: inputCity.value,
                    email: inputMail.value,
                },
                products: boughtArticles
            };
            //requete post au backend!
            const options = {
                method: "POST",
                body: JSON.stringify(order),
                headers: { "Content-Type": "application/json"},
            };

            //formater prix pour l'affichage
            let totalConfirmation = document.querySelector(".total").innerText;
            totalConfirmation = totalConfirmation.split(" :");
            
            //envoi de la requete vers la page de confirmation
            fetch("http://localhost:3000/api/cameras/order", options)
            .then((Response) => Response.json())
            .then((data) => {
                localStorage.clear();
                console.log(data)
                localStorage.setItem("orderId", data.orderId);
                localStorage.setItem("total", totalConfirmation[1]);

                let orderLocalStorage = [];
                orderLocalStorage.push(data);
                localStorage.setItem("order", JSON.stringify(orderLocalStorage));
               
                //verifier le statut de la requete
                document.location.href = "confirmation.html";
            })
        }
    });
}
//boughtArticles.push(copyLocalStorage);

//-----------------REGEXP--------------------------
let form = document.querySelectorAll('.order_form input');
//console.log(form.user_name);
//ajouter addeventlistener pour ecouter les changements
for (let input of form) {
    input.addEventListener('change', function () {
      //console.log(input);
      //validName(this);
      validLastName(this);
      //validEmail(this);
      //validStreet(this);
     // validCity(this);
      //validPostal(this);
    });
  }
//form.user_street.addEventListener('change', function() {validStreet(this);}); => exemple syntaxe pour qu'un seul input!!!
//fonction pour valider prenom

//valider nom
const validLastName = function (inputLastname) {
    let LastNameRegExp = new RegExp(/^[a-zA-Z ,.'-]+$/);
    let emailRegExp = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
    );
    //let StreetRegExp = new RegExp(/^[#.0-9a-zA-Z\s,-]+$/);
    //let PostalRegExp = new RegExp(/^[a-zA-Z',.\s-]{1,25}$/);
    let inputtt = document.querySelectorAll("#inputtt")
    let small = inputtt.nextElementSibling;
    //On teste les expressions regulière
  if (LastNameRegExp.test(inputLastname.value)) {
    small.innerHTML =  "Nom Valide!";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
  } else {
    small.innerHTML = "Nom non valide!";
    small.classList.add("text-danger");
    small.classList.remove("text-success");
  }
  if (LastNameRegExp.test(inputName.value)) {
    small.innerHTML =  "prenom Valide!";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
  } else {
    small.innerHTML = "prenom non valide!";
    small.classList.add("text-danger");
    small.classList.remove("text-success");
  }
  if (emailRegExp.test(inputMail.value)) {
    small.innerHTML =  "email Valide!";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
  } else {
    small.innerHTML = "email non valide!";
    small.classList.add("text-danger");
    small.classList.remove("text-success");
  }
};


//const validName = function (inputName) {
    let nameRegExp = new RegExp(/^[a-zA-Z ,.'-]+$/);
    //let small = inputtt.nextElementSibling;
    //On teste les expressions regulière
  if (nameRegExp.test(inputName.value)) {
    small.innerHTML =  "Prénom Valide!";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
   
  } else {
    small.innerHTML = "Prénom non valide!";
    small.classList.add("text-danger");
    small.classList.remove("text-success");
    
  }


//valider email
const validEmail = function (inputEmail) {
    let emailRegExp = new RegExp(
        '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g'
    );
    let testEmail = emailRegExp.test(inputEmail.value);
    //console.log(testEmail);
    let caseEmail = inputEmail.nextElementSibling;
    if (testEmail) {
        caseEmail.innerHTML = 'Email valide!';
        caseEmail.classList.remove('text-danger');
        caseEmail.classList.add('text-success');
    } else {
        caseEmail.innerHTML = 'Email non valide!';
        caseEmail.classList.add('text-danger');
        caseEmail.classList.remove('text-success');
    }
};
//Valider Rue
const validStreet = function (inputStreet) {
    let StreetRegExp = new RegExp(/^[#.0-9a-zA-Z\s,-]+$/);
    let small = inputStreet.nextElementSibling;
    //On teste les expressions regulière
  if (StreetRegExp.test(inputStreet.value)) {
    small.innerHTML =  "Adresse Valide!";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
  } else {
    small.innerHTML = "Adresse non valide!";
    small.classList.add("text-danger");
    small.classList.remove("text-success");
  }
};
//valider ville
const validCity = function (inputCity) {
    let CityRegExp = new RegExp(/^[a-zA-Z',.\s-]{1,25}$/);
    let small = inputCity.nextElementSibling;
    //On teste les expressions regulière
  if (CityRegExp.test(inputCity.value)) {
    small.innerHTML =  "Adresse Valide!";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
  } else {
    small.innerHTML = "Adresse non valide!";
    small.classList.add("text-danger");
    small.classList.remove("text-success");
  }
};
const validPostal = function (inputPostal) {
    let PostalRegExp = new RegExp(/^[a-zA-Z',.\s-]{1,25}$/);
    let small = inputPostal.nextElementSibling;
    //On teste les expressions regulière
  if (PostalRegExp.test(inputPostal.value)) {
    small.innerHTML =  "Code postal Valide!";
    small.classList.remove("text-danger");
    small.classList.add("text-success");
    return true;
  } else {
    small.innerHTML = "Code postal non valide!";
    small.classList.add("text-danger");
    small.classList.remove("text-success");
    return false;
  }
};