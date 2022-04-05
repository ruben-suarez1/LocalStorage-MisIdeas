//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


//Event listener 
eventListeners();

function eventListeners() {

    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || [];

        console.log(tweets);

        crearHTML();
    });
}

//Funciones 
function agregarTweet(e) {
    e.preventDefault();

    //Text area donde usuario escribe el tweet
    const tweet = document.querySelector('#tweet').value;

    //Validacion 
    if(tweet === '') {
        mostrarError('Un mesaje no puede ir vacio')

        return;//Evita que ejecute mas kineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet: tweet
    }
    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    //una vez agregado creamos HTML
    crearHTML();

    //reiniciar formulario
    formulario.reset();
}

//Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//muestra un listado de los tweets
function crearHTML() {

    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {

            //agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir la fumcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //crera el Html
            const li = document.createElement('li');

            //añadir el texto
            li.innerHTML = tweet.tweet;

            //Asignar el boton
            li.appendChild(btnEliminar);

            //insertar en html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
} 

//Agrega los tweets actuales al localstorage

function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}

//limpiar el HTML
function limpiarHTML() {
    while( listaTweets.firstChild ) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}