// adding event listeners 

let sportDiv = document.getElementById("sports");
sportDiv.addEventListener('click', populate)

let healthDiv = document.getElementById("health");
healthDiv.addEventListener('click', populate)

let scienceDiv = document.getElementById("science");
scienceDiv.addEventListener('click', populate)

let btnCategory = document.getElementById("categoryBtn");
btnCategory.addEventListener('click', backToCategory)
btnCategory.style.display = "none";


let categoryDiv = document.getElementById("CardsHolderpg1");

let spinnerDiv = document.getElementById("spinner");
spinnerDiv.style.display = "none";

let newsMain = document.getElementById("newsMain");
newsMain.style.display = "none";

// going back to categories 

function backToCategory() {
    btnCategory.style.display = "none";
    categoryDiv.style.display = "flex";
    newsMain.style.display = "none";

}

// populating news on UI


function populate() {
    let internetStatus = navigator.onLine;
    // console.log(internetStatus)
    spinnerDiv.style.display = "block"

    // console.log("you have clicked  card whos id is : ", this.id)
    let category = this.id
    // if internet is connected requesting for data from {newsapi.org}
    if (internetStatus) {
        // instantiate an xhr object
        const xhr = new XMLHttpRequest();

        // open the object
        xhr.open('GET', `https://newsapi.org/v2/everything?q=${category}&apiKey=1cbcde3215f446b2852cbe4cb3e05354`, true);

        // what to do on progress
        xhr.onprogress = function () {
            // console.log("on progress")
            spinnerDiv.style.display = "block"
        }

        xhr.onload = function () {
            if (this.status === 200) {
                spinnerDiv.style.display = "none"
                newsMain.style.display = "flex";

                let obj = JSON.parse(this.responseText)
                // console.log(obj.articles)

                // storing data in local storage

                localStorage.setItem("savedNews", JSON.stringify(obj));


                let newspage = document.getElementById("newsDiv");
                //  hiding category divs 
                categoryDiv.style.display = "none";
                // displaying results on website
                let structure = "";
                for (let step = 0; step < 10; step++) {
                    let news = obj.articles[step]
                    structure += `<div class="newscard">
                <img class="newsImage" src="${news.urlToImage}" alt="">
                <h5 class="newsTitle">${news.title.slice(0, 40)}...</h5>
                <p class="newsDate">${news.publishedAt}</p>
                <p class="newDescription">${news.description.slice(0, 80)}...</p>
                <a class="margin" href="${news.url}" target="_blank"><button type="button" class="btn btn-primary">Read more</button></a>
            </div>`
                    newsMain.innerHTML = structure;
                }

                btnCategory.style.display = "block";


            }
            else {
                console.log("some error occured");

            }
        }
    
    // sending request
    xhr.send();
    }


    // if internet is not connected using local storage
    else {
        spinnerDiv.style.display = "none"
        categoryDiv.style.display = "none";
        newsMain.style.display = "flex";

        let obj = JSON.parse(localStorage.getItem("savedNews"));
        let structure = "";
        for (let step = 0; step < 10; step++) {
            let news = obj.articles[step]
            structure += `<div class="newscard">
                    <img class="newsImage" src="./images/noImageAvailable.png" alt="">
                    <h5 class="newsTitle">${news.title.slice(0, 40)}...</h5>
                    <p class="newsDate">${news.publishedAt}</p>
                    <p class="newDescription">${news.description.slice(0, 80)}...</p>
                    <a class="margin" href="${news.url}" target="_blank"><button type="button" class="btn btn-primary">Read more</button></a>
                </div>`
            newsMain.innerHTML = structure;
        }
        btnCategory.style.display = "block";

    
    }
}


