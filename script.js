const musica = document.getElementById("musica");
const progresso = document.querySelector(".progresso");

const fotos = document.querySelectorAll(".foto");
const storyBars = document.querySelectorAll(".story-progress");

const diasEl = document.getElementById("dias");
const horasEl = document.getElementById("horas");
const minutosEl = document.getElementById("minutos");
const segundosEl = document.getElementById("segundos");

let fotoAtual = 0;

/* LOADER + MUSICA */

window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loader").style.display="none";

musica.play().catch(()=>{});

},2000);

});

/* CRONOMETRO */

const dataInicio = new Date("2026-01-17T00:00:00");

function atualizarContador(){

const agora=new Date();

const diff=agora-dataInicio;

const dias=Math.floor(diff/(1000*60*60*24));
const horas=Math.floor((diff/(1000*60*60))%24);
const minutos=Math.floor((diff/(1000*60))%60);
const segundos=Math.floor((diff/1000)%60);

diasEl.innerText=dias;
horasEl.innerText=horas;
minutosEl.innerText=minutos;
segundosEl.innerText=segundos;

}

setInterval(atualizarContador,1000);

/* TROCAR FOTO */

function trocarFoto(){

fotos[fotoAtual].classList.remove("ativa");

storyBars[fotoAtual].style.width="100%";

fotoAtual++;

if(fotoAtual>=fotos.length){

fotoAtual=0;

storyBars.forEach(bar=>bar.style.width="0%");

}

fotos[fotoAtual].classList.add("ativa");

}

setInterval(()=>{

let progressoStory=0;

const barra=storyBars[fotoAtual];

const intervalo=setInterval(()=>{

progressoStory+=2;

barra.style.width=progressoStory+"%";

if(progressoStory>=100){

clearInterval(intervalo);

trocarFoto();

}

},100);

},5000);

/* BARRA MUSICA */

musica.addEventListener("timeupdate",()=>{

const porcentagem=(musica.currentTime/musica.duration)*100;

progresso.style.width=porcentagem+"%";

});

/* CORACOES */

setInterval(()=>{

const heart=document.createElement("div");

heart.classList.add("heart");

heart.innerHTML="❤️";

heart.style.left=Math.random()*100+"vw";
heart.style.top=Math.random()*100+"vh";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},2000);

},700);

/* CANVAS ESTRELAS */

const canvas = document.getElementById("estrelas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* ESTRELAS */

let estrelas = [];

for(let i=0;i<140;i++){

estrelas.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
r:Math.random()*2,
brilho:Math.random(),
vel:Math.random()*0.02
});

}

/* ESTRELAS CADENTES */

let estrelasCadentes = [];

function criarEstrelaCadente(){

estrelasCadentes.push({
x:Math.random()*canvas.width,
y:0,
len:Math.random()*80+10,
vel:Math.random()*10+6
});

}

setInterval(criarEstrelaCadente,4000);

/* DESENHO */

function desenharEstrelas(){

ctx.clearRect(0,0,canvas.width,canvas.height);

/* BRILHO */

estrelas.forEach(e=>{

e.brilho+=e.vel;

if(e.brilho>1 || e.brilho<0){
e.vel=-e.vel;
}

ctx.beginPath();
ctx.arc(e.x,e.y,e.r*(0.5+e.brilho),0,Math.PI*2);
ctx.fillStyle="white";
ctx.fill();

});

/* CADENTES */

estrelasCadentes.forEach((s,i)=>{

ctx.beginPath();
ctx.moveTo(s.x,s.y);
ctx.lineTo(s.x-s.len,s.y+s.len);
ctx.strokeStyle="white";
ctx.lineWidth=2;
ctx.stroke();

s.x+=s.vel;
s.y+=s.vel;

if(s.y>canvas.height){

estrelasCadentes.splice(i,1);

}

});

requestAnimationFrame(desenharEstrelas);

}

desenharEstrelas();

/* CORAÇÕES SUBINDO */

setInterval(()=>{

const heart=document.createElement("div");

heart.classList.add("rising-heart");

heart.innerHTML="❤️";

heart.style.left=Math.random()*100+"vw";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},6000);

},1200);

/* PARALLAX CELULAR */

window.addEventListener("deviceorientation",(event)=>{

const x=event.gamma/30;
const y=event.beta/60;

document.querySelector(".foto-container").style.transform=
`translate(${x*10}px,${y*10}px)`;

});

/* TEXTO LETRA POR LETRA */

const texto = "Desde o dia 17/01/2026 tudo ficou mais bonito. Esse é só um pequeno jeito de mostrar o quanto você é especial.";
const elementoTexto = document.getElementById("texto-amor");

let i = 0;

function escreverTexto(){

if(i < texto.length){

elementoTexto.innerHTML += texto.charAt(i);

i++;

setTimeout(escreverTexto, 50);

}

}

window.addEventListener("load",()=>{

setTimeout(escreverTexto,1500);

});

/* BRILHO AO MEXER O DEDO */

document.addEventListener("touchmove",(e)=>{

const sparkle=document.createElement("div");

sparkle.classList.add("sparkle");

sparkle.style.left=e.touches[0].clientX+"px";
sparkle.style.top=e.touches[0].clientY+"px";

document.body.appendChild(sparkle);

setTimeout(()=>{

sparkle.remove();

},800);

});

/* STORIES AO TOCAR */

const fotoContainer = document.querySelector(".foto-container");

fotoContainer.addEventListener("click",()=>{

trocarFoto();

});