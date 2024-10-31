document.addEventListener('DOMContentLoaded', function() {
    localStorage.setItem("predios", JSON.stringify([]))
    const botaoPredio1 = document.getElementById("predio1");
    const botaoPredio2 = document.getElementById("predio2");
    const botaoPredio3 = document.getElementById("predio3");

    if (botaoPredio1) {
        botaoPredio1.addEventListener('click', function () {
            window.location.href = 'predio01.html';
        });
    }

    if (botaoPredio2) {
        botaoPredio2.addEventListener('click', function () {
            window.location.href = 'predio02.html';
        });
    }

    if (botaoPredio3) {
        botaoPredio3.addEventListener('click', function () {
            window.location.href = 'predio03.html';
        });
    }
});