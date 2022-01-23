console.log("learning ajax with code with harry")

let fetchBtn = document.getElementById("populatebtn");
fetchBtn.addEventListener('click',buttonClickHandler)

function buttonClickHandler(){
    console.log("you have clicked populatebtn");

    // instantiate an xhr object
    const xhr = new XMLHttpRequest();

    // open the object
    xhr.open('GET','http://dummy.restapiexample.com/api/v1/employees',true);

    // what to do on progress
    xhr.onprogress = function (){
        console.log("on progress")
    }

    xhr.onload = function(){
        if(this.status === 200){
            let obj = JSON.parse(this.responseText)
            console.log(obj.data[20].employee_name)
        }
        else{
            console.log("some error occured")
        }
    }
    // sending request
    xhr.send();
}