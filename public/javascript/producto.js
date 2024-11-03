const minus = document.getElementById("minus");
const number = document.getElementById("number");
const more = document.getElementById("more");
const cartButton = document.getElementById("cartbutton");


minus.addEventListener("click", () => {
    if(number.value > 0){
    number.value = number.value -1;
    cartButton.dataset.quantity = number.value;
    cartButton.href = `/cart?id=${cartButton.dataset.id}&quantity=${cartButton.dataset.quantity}`;
    }
})

more.addEventListener("click", () => {
    number.value = parseInt(number.value) +1;
    cartButton.dataset.quantity = number.value;
    cartButton.href = `/cart?id=${cartButton.dataset.id}&quantity=${cartButton.dataset.quantity}`;
})
