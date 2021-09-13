
//function call   
getArticles();

let article = []; //information pour un article dans tableau 

// Recuperer Api
function getArticles() { //fonction
    fetch("http://localhost:3000/api/cameras")
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        // message en cas derreur
        .catch((error) => {
            products.innerHTML = "Une erreur est survenue.Réessayer plustard!";
        })

        // afficher sur la console avec node: aller sur le terminal lancer le serveur --> backend - npm install - npm run start - node server 
        .then(function (resultsAPI) {
            const articles = resultsAPI;
            console.log("tableauDesArticles: "); //loger a chaque nouvel rentree
            console.log(articles);
            // afficher dans le DOM
            for (let article in articles) {
                
                let productCart = document.createElement("div"); //creer nouvel element
                document.getElementById(".products"); //dans celui-la
                products.appendChild(productCart); //enfant de la gauche
                productCart.classList.add("cart_product"); //avec cet class..
                //lien
                let productLink = document.createElement("a"); //creer element pour le lien
                productCart.appendChild(productLink); //enfant de la gauche
                productLink.href = `product.html?id=${articles[article]._id}`; //inserer le lien de l'article
                productLink.classList.add("article_link"); //avec cet class
                //image
                let productImgDiv = document.createElement("div"); //cree element pour img
                productLink.appendChild(productImgDiv); //enfant du productlink
                productImgDiv.classList.add("product_img"); //avec cet class

                let productImg = document.createElement("img"); //element pour img
                productImgDiv.appendChild(productImg);
                productImg.src = articles[article].imageUrl; //inserer l'images
                //description
                let productInfosDiv = document.createElement("div"); //creer element pour englober la description
                productLink.appendChild(productInfosDiv);
                productInfosDiv.classList.add("product_infos");

                let productInfosTitle = document.createElement("div"); //element pour le titre
                productInfosDiv.appendChild(productInfosTitle);
                productInfosTitle.classList.add("product_infos_title");
                productInfosTitle.innerHTML = articles[article].name; //titre avec innerhtml pour inserer du text

                let productInfosPrice = document.createElement("div");//element pour le prix
                productInfosDiv.appendChild(productInfosPrice);
                productInfosPrice.classList.add("product_infos_price");
                productInfosPrice.price = articles[article].price/100;//recuperer la valeur
               
                // methode pour formater le prix 
                //inserer le prix avec la methode; new = objet / intl.numberformat = la classe / paranthese = fonction => format => inserer prix
                productInfosPrice.innerHTML = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR",}).format(productInfosPrice.price);
                console.log("un article: " + articles[article]._id);
            }
        })
}