const p = JSON.parse(localStorage.getItem("predios")) || {};

document.addEventListener('DOMContentLoaded', function() { 
    const nomePredio = document.querySelector(".localCetrus h1");
    const enderecoPredio = document.querySelector(".localCetrus p");

    nomePredio.textContent = p.predio || "Nome não disponível";
    enderecoPredio.textContent = p.local || "Endereço não disponível";
})
