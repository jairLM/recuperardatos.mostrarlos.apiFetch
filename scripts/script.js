
const btnGetData = document.getElementById('btn-obtener');

btnGetData.addEventListener('click', checkDataStorage);
    



function checkDataStorage(){  //se checa el localstorage  
    
    
    const users = localStorage.getItem('users');  //obtenemos los valores con la palabra clave que se le coloco 'users'
    if( !users ) {  //si no esta 'users' en el local storage, se inicializa la solicitud 

        showUsers();
        

    } else if ( users ) {     //si la diferencia del tiempo en que se creo con la fecha actual es mayor a 1 min igual se inicializa la solitud   
        
        const timeDifference = lifeSpan();
        const usersObject = JSON.parse(users);  //se pasa a objeto
        const getTimeActual = usersObject[0].createdAt;  //se obteiene el atributo createAt que es la hora en ms en que se creo 
        var differenceTime = timeDifference-getTimeActual; 
        if(differenceTime > 60000 ){

        }else if ( differenceTime < 60000 ){      //si el tiempo es menor a 1 minuto se imprimen directo los datos
        
            printCurrentData(usersObject)
        }

    }


}

    
    
    
     


async function getData(){ //funcion para obtenemnos los usuarios de la api
    url = 'https://reqres.in/api/users?delay=3'
    try{
        const responseJSON = await fetch(url);  //otenemos los datos         
        const resolve = await responseJSON.json(); //pasamos los datos a objetos        
        return resolve.data;
        
    }
    catch(error){
        console.log(error);
    }

    
}


class User {        //se creo clase objeto para psarle los atributos a los objetos asi como la hora en que se crearon

    constructor(id, first_name, last_name, email, avatar){ //metodo contructor para User
        this.id = id                    //atributos
        this.firstName = first_name
        this.lastName = last_name
        this.email = email
        this.image = avatar
        this.createdAt = new Date().getTime();
    }
     
}
function  lifeSpan(){
            return new Date().getTime(); //se crea la fecha actual
        }





async function showUsers(a) {
    const users = await createUsers(); //se guardan los objetos creados en la variable users   
    localStorage.setItem("users", JSON.stringify(users)) //se guardan los datos en el localstorage como json y se identifican con la palabra clave 'users'   
     printToDom(users); //se invoca la funcion printToDom() y le pasamos los objetos como parámetros
}





async function createUsers(){  //crear usuarios
    const users = await getData(); //se manda a llamar la funcion getData para obtener los datos de la api    
    return users.map(({id, first_name: firstName, last_name:lastName, email, avatar:image, createAt:time})=>        
        
        new User (id, firstName, lastName, email, image, time ) 
        
    );   
    
}



function printToDom(users){  //funcion para imprimir los datos en el dom 
    
    const impresion = users.map((user)=>`<tr>  
                                    <th scope="row">${user.id}</th> 
                                    <td>${user.firstName}</td> 
                                    <td>${user.lastName}</td> 
                                    <td>${user.email}</td> 
                                    <td><img class="img-from-styles" src="${user.image}" alt="${user.firstName}-image"></td> 
                                </tr>`);   //estructura para ponerlos en el dom
    
const idDom = document.getElementById('id'); //elemento donde se colocara la estructura de los datos
    idDom.innerHTML = impresion;
    

}




printCurrentData = (data) =>{  //funcion para imprimir los datos si es que ya estan en el local storage
    let idPeople = '';  
    for (const key in data) {  //bucle para iterar el arreglo 
        let info = data[key]
         idPeople += `<tr>
                        <th scope="row">${info.id}</th>
                        <td>${info.firstName}</td> 
                        <td>${info.lastName}</td> 
                        <td>${info.email}</td> 
                        <td><img class="img-from-styles" src="${info.image}" alt="${info.firstName}-image">  </td> 
                     </tr>`
    }

    const idDom = document.getElementById('id');
    idDom.innerHTML = idPeople;
   

}





