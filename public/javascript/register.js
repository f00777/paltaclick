let gender = '';

document.getElementById('male').addEventListener('click', () => {
    if(document.getElementById('female').checked){
        document.getElementById('female').checked = false;
        document.getElementById('male').checked = true;
    }   
    if(document.getElementById('other').checked){
        document.getElementById('other').checked = false;
        document.getElementById('male').checked = true;
    }   

    else{
        document.getElementById('male').checked = true;
    }

    gender = 'male';
})

document.getElementById('female').addEventListener('click', () => {
    if(document.getElementById('male').checked){
        document.getElementById('male').checked = false;
        document.getElementById('female').checked = true;
    }   
    if(document.getElementById('other').checked){
        document.getElementById('other').checked = false;
        document.getElementById('female').checked = true;
    }   

    else{
        document.getElementById('female').checked = true;
    }
    gender = 'female'
})

document.getElementById('other').addEventListener('click', () => {
    if(document.getElementById('male').checked){
        document.getElementById('male').checked = false;
        document.getElementById('other').checked = true;
    }   
    if(document.getElementById('female').checked){
        document.getElementById('female').checked = false;
        document.getElementById('other').checked = true;
    }   

    else{
        document.getElementById('other  ').checked = true;
    }
    gender = 'other';
})


document.getElementById('reset').addEventListener('click', () => {
    document.getElementById('name').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('address').value = '';
    document.getElementById('zipcode').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password2').value = '';
})

document.getElementById('submit').addEventListener('click', () => {
    document.getElementById('name1').value = document.getElementById('name').value;
    document.getElementById('lastname1').value = document.getElementById('lastname').value;
    document.getElementById('address1').value = document.getElementById('address').value;
    document.getElementById('gender1').value = gender;
    document.getElementById('zipcode1').value = document.getElementById('zipcode').value;
    document.getElementById('email1').value = document.getElementById('email').value;
    document.getElementById('password1').value = document.getElementById('password').value;
    document.getElementById('password12').value = document.getElementById('password2').value;
    document.getElementById('submit2').click();
})