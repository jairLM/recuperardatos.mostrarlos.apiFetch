
const btnGetData = document.getElementById('btn-obtener');

btnGetData.addEventListener('click', getData);

async function getData(){
    url = 'https://reqres.in/api/users?delay=3'
    try{
        const responseJSON = await fetch(url);  //otenemos los datos 
        const resolve = await responseJSON.json(); //pasamos los datos a objetos
        printToDom(resolve.data)
        
    }
    catch(error){
        console.log(error);
    }

    
}

printToDom = (data) =>{
    let idPeople = '';
    for (const key in data) {
        let info = data[key]
         idPeople += `<tr>
                        <th scope="row">${info.id}</th>
                        <td>${info.first_name}</td> 
                        <td>${info.last_name}</td> 
                        <td>${info.email}</td> 
                        <td><img src="${info.avatar}" alt="${info.first_name}-image">  </td> 
                     </tr>`
    }

    const idDom = document.getElementById('id');
    idDom.innerHTML = idPeople;
   



}

