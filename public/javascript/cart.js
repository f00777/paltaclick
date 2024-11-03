document.addEventListener('DOMContentLoaded', ()=>{
    const preciosFinales = document.querySelectorAll('.precioFinal');
    const preciosProducto = document.querySelectorAll('.btn-qty');
    const botonmas = document.querySelectorAll('.botonmas');
    const botonmenos = document.querySelectorAll('.botonmenos');
    const pay = document.getElementById('pay');
    let objects = [];

    preciosFinales.forEach(pf => {
        total = 0;
        preciosProducto.forEach(precio => {
            total = total + parseInt(precio.value)*parseInt(precio.dataset.price);
        })
        pf.innerHTML = `$ ${total}`;
    })

    botonmas.forEach(btnmas => {
        btnmas.addEventListener('click', ()=> {
            btnmas.parentElement.querySelector('.btn-qty').value++;
            total = 0;
            preciosProducto.forEach(precio => {
                total = total + parseInt(precio.value)*parseInt(precio.dataset.price);
            })
            
            preciosFinales.forEach(pf => {
                pf.innerHTML = `$ ${total}`;
            })
        }) 
    })

    botonmenos.forEach(btnmenos => {
        btnmenos.addEventListener('click', ()=> {
            btnmenos.parentElement.querySelector('.btn-qty').value--;
            total = 0;
            preciosProducto.forEach(precio => {
                total = total + parseInt(precio.value)*parseInt(precio.dataset.price);
            })
            
            preciosFinales.forEach(pf => {
                pf.innerHTML = `$ ${total}`;
            })
        }) 

    })


    preciosProducto.forEach(producto => {
        producto.addEventListener('change', ()=>{
            total = 0;
            preciosProducto.forEach(precio => {
                total = total + parseInt(precio.value)*parseInt(precio.dataset.price);
            })
            
            preciosFinales.forEach(pf => {
                pf.innerHTML = `$ ${total}`;
            })
            
        })

    })


    pay.addEventListener('click', async ()=> {
        preciosProducto.forEach(element => {
            objects.push({
                id: `${element.dataset.id}`,
                quantity: `${element.value}`
            })
        })

         try{
            console.log(objects);
            const response = await fetch('/auth/update',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(objects)
            })

            const result = await response.json;
            if(result){
                window.location.href = '/auth/pay';
            }
        }
        catch(error){
            console.log(error);
        }
    })



    
    
    
})