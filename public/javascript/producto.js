const minus = document.getElementById("minus");
const number = document.getElementById("number");
const more = document.getElementById("more");

minus.addEventListener("click", () => {
    if(number.value > 0){
    number.value = number.value -1;
    }
})

more.addEventListener("click", () => {
    number.value = number.value +1;
})
