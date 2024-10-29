document.addEventListener('DOMContentLoaded', function() {
    localStorage.setItem("predios", JSON.stringify([]))
    const botaoPredio1 = document.getElementById("predio1");
    const botaoPredio2 = document.getElementById("predio2");
    const botaoPredio3 = document.getElementById("predio3");

    if (botaoPredio1) {
        botaoPredio1.addEventListener('click', function () {
            window.location.href = 'predios.html';
            let p = {
                predio:"Prédio 01",
                local: "Av. Jabaquara, 474"
            }
            localStorage.setItem("predios", JSON.stringify(p))
        });
    }

    if (botaoPredio2) {
        botaoPredio2.addEventListener('click', function () {
            window.location.href = 'predios.html';
            let p = {
                predio:"Prédio 02",
                local: "Av. Jabaquara, 491"
            }
            localStorage.setItem("predios", JSON.stringify(p))
        });
    }

    if (botaoPredio3) {
        botaoPredio3.addEventListener('click', function () {
            window.location.href = 'predios.html';
            let p = {
                predio:"Prédio 03",
                local: "Av. Jabaquara, 1280"
            }
            localStorage.setItem("predios", JSON.stringify(p))
        });
    }
});