//Sala Privada

const privada = document.querySelector(".privada");
const mascara = document.querySelector("#mascara");
const porta = document.querySelector("#porta");

privada.addEventListener('click', ()=>{
    mascara.style.display = "block";
    porta.style.display = "block";
});
mascara.addEventListener('click', ()=>{
    mascara.style.display = "none";
    porta.style.display = "none";
});
//Scroll Up

const topo = document.querySelector("#up");
topo.addEventListener('click', ()=>{
    window.scroll({
        top:0,
        behavior:"smooth",
    });
});