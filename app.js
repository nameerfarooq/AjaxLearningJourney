console.log("learning ajax with code with harry")

let fetchBtn = document.getElementById("fetchbtn");
fetchBtn.addEventListener('click',buttonClickHandler)

function buttonClickHandler(){
    console.log("you have clicked fetchBtn");

    // instantiate an xhr object
    const xhr = new XMLHttpRequest();

    // open the object
    xhr.open('GET','nameer1.txt',true);

    // what to do on progress
    xhr.onprogress = function (){
        console.log("on progress")
    }

    xhr.onload = function(){
        if(this.status === 200){
            console.log(this.responseText)
        }
        else{
            console.log("some error occured")
        }
    }
    // sending request
    xhr.send();
}