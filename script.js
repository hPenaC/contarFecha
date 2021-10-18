let contador = 0;
let interval;
let titleRef = document.getElementById('titleText');

if(localStorage.getItem('title')){  
  titleRef.contentEditable=false;
  titleRef.innerHTML=localStorage.getItem('title');
  let fechaDestino = new Date(localStorage.getItem('title'));
  interval = setInterval(()=>{empezarAContar(fechaDestino)},1000);
}


function guardarTexto(event){
  if(event.srcElement.innerHTML&&event.srcElement.innerHTML!=''&&event.srcElement.innerHTML!='Fecha'){
    console.log('Elemento a guardar : ',event.srcElement.innerHTML);  
    let fechaDestino = new Date(event.srcElement.innerHTML);
    if(fechaDestino!='Invalid Date'){
      console.log("Fecha destino : ",fechaDestino);
      interval = setInterval(()=>{empezarAContar(fechaDestino)},1000);
      event.srcElement.contentEditable=false;
      localStorage.setItem('title',event.srcElement.innerHTML);    
    }else{
     alert('Por favor, introduce una fecha válida'); 
     titleRef.innerHTML = 'Fecha';    
    }    
  }else{
    titleRef.innerHTML = 'Fecha';
  }
}

function empezarAContar(fechaDestino){
  let fechaActual = new Date();
  let totalSeconds = (fechaDestino-fechaActual)/1000;
  document.getElementById('years').innerHTML=formatDate(Math.floor(totalSeconds / 31104000));
  document.getElementById('months').innerHTML=formatDate(Math.floor(totalSeconds / 2592000)%12); 
  document.getElementById('days').innerHTML=formatDate(Math.floor(totalSeconds / 86400) % 31);
  document.getElementById('hours').innerHTML=formatDate(Math.floor(totalSeconds / 3600) % 24);
  document.getElementById('minutes').innerHTML=formatDate(Math.floor(totalSeconds / 60) % 60);
}

function formatDate(date){
  if(date<0)return 0;
  return (date>9)?date:`0${date}`;
}

function clearAll(){
  clearInterval(interval);
  titleRef.innerHTML = 'Fecha';
  document.getElementById('years').innerHTML='00';
  document.getElementById('months').innerHTML='00';
  document.getElementById('days').innerHTML='00';
  document.getElementById('hours').innerHTML='00';
  document.getElementById('minutes').innerHTML='00';
  localStorage.removeItem('title');
  titleRef.contentEditable=true;
}
