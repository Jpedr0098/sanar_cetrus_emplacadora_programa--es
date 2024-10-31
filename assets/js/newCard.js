const spreadsheetId = '19l6EyZDCQFkGCFO2HmBNIVAvs3EdjVgnc9KyQXubWlw';  // ID correto da planilha
const range = 'PLACAS';  // Nome exato da aba

async function carregarDados() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?alt=json&key=AIzaSyB45aJ88-iyQzEMUM7Bk99C5gMb0dEAX_E`;
    let valPredio

    const p = JSON.parse(localStorage.getItem("predios")) || {};
    if (p.predio == 'Prédio 01') valPredio = "PRÉDIO I"
    if (p.predio == 'Prédio 02') valPredio = "PRÉDIO II"
    if (p.predio == 'Prédio 03') valPredio = "PRÉDIO III"

    try {
        const response = await fetch(url);

        if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const plan = data.values;

        const container = document.getElementById("cardsResult")
        container.innerHTML=''

        const periodo = obterPeriodoDoDia()

        plan.forEach(linha => {
            if (linha[0] == "Data") {
                document.getElementById("dt_site").innerHTML = `Data: ${linha[9]}`
                return
            }
            

            if (linha[1] != periodo) return

            if(linha[2] != valPredio) return

            const model = `<div class="curso">
                                <h1></h1>
                                <h1>${linha[4]}</h1>
                            </div>
                            <div class="horario">
                                <h1>${linha[5]}</h1>
                            </div>
                            <div class="andares">
                                <h1>${linha[8]}</h1>
                                <p>${linha[7]}</p>
                            </div>`
            
             const card = document.createElement("div")
             card.classList.add("evento")
             card.innerHTML = model

            if (linha[6] == 'FALSE') {
                const notificacao = document.createElement('span');
                notificacao.classList.add('notificacao');
                card.appendChild(notificacao);
            }

            container.appendChild(card)
        });

    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
    }
}

function obterPeriodoDoDia() {
    const agora = new Date();  // Obtém a data e hora atual
    const hora = agora.getHours();  // Extrai a hora (0 a 23)

    // const dia = String(agora.getDate()).padStart(2, '0');  // Extrai o dia e garante 2 dígitos
    // const mes = String(agora.getMonth() + 1).padStart(2, '0');  // Extrai o mês (0 a 11) e ajusta
    // const ano = agora.getFullYear();
    // const data = `Data: ${dia}/${mes}/${ano}`

    // document.getElementById("dt_site").innerHTML = data

    if (hora >= 0 && hora < 12) {
        document.getElementById("periodo_site").innerHTML = "Periodo: Manhã"
        return "Manhã";
    } else {
        document.getElementById("periodo_site").innerHTML = "Periodo: Tarde"
        return "Tarde";
    }
}

setInterval(carregarDados, 300000); 
carregarDados(); // Chama a função ao carregar a página
