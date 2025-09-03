const spreadsheetId = '19l6EyZDCQFkGCFO2HmBNIVAvs3EdjVgnc9KyQXubWlw';  // ID correto da planilha
const range = 'Placas_NEW';  // Nome exato da aba

async function carregarDados() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?alt=json&key=AIzaSyB45aJ88-iyQzEMUM7Bk99C5gMb0dEAX_E`;
    let valPredio

    const p = document.querySelector(".localCetrus h1").innerHTML
    if (p == 'Prédio 01') valPredio = "PRÉDIO I"
    if (p == 'Prédio 02') valPredio = "PRÉDIO II"
    if (p == 'Prédio 03') valPredio = "PRÉDIO III"

    try {
        const response = await fetch(url, {
            method: 'GET',
            cache: 'no-store' // Configura para não usar cache
        });

        if (!response.ok) {
            console.log("ERRO");
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const plan = data.values;

        console.log(plan)

        const container = document.getElementById("cardsResult")
        container.innerHTML=''

        const periodo = obterPeriodoDoDia()
        document.getElementById("dt_site").innerHTML = `Data: ${plan[1][0]}`

        plan.forEach(linha => {
            if (linha[0] == "Data") {
                return
            }

            let numTurma
            if (linha[8] == 'TRUE') {
                numTurma = String(linha[4])
                numTurma = numTurma.split(" - ") [1]
            } else {
                numTurma = ''
            }

            

            if (linha[1] != periodo) return

            if(linha[2] != valPredio) return

            const model = `<div class="curso">
                                <h1 class="nCurso">${numTurma}</h1>
                                <h1>${linha[5]}</h1>
                            </div>
                            <div class="horario">
                                <h1>${linha[6]}</h1>
                            </div>
                            <div class="andares">
                                <h1>${linha[10]}</h1>
                                <p>${linha[9]}</p>
                            </div>`
            
             const card = document.createElement("div")
             card.classList.add("evento")
             card.innerHTML = model

            if (linha[7] == 'FALSE' && linha[11] == 'yes') {
                const notificacao = document.createElement('span');
                notificacao.classList.add('notificacao');
                card.appendChild(notificacao);

                const dayOneNotificacaoC = document.createElement('span');
                dayOneNotificacaoC.classList.add('notificacaoDAYONE_Completude');
                dayOneNotificacaoC.innerText = "D1"
                card.appendChild(dayOneNotificacaoC);
            }

            else if (linha[7] == 'FALSE') {
                const notificacao = document.createElement('span');
                notificacao.classList.add('notificacao');
                card.appendChild(notificacao);
            }

            else if (linha[11] == 'yes') {
                const dayOneNotificacao = document.createElement('span');
                dayOneNotificacao.classList.add('notificacaoDAYONE');
                dayOneNotificacao.innerText = "D1"
                card.appendChild(dayOneNotificacao);
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

    if (hora >= 0 && hora < 12) {
        document.getElementById("periodo_site").innerHTML = "Período: Manhã"
        return "Manhã";
    } else {
        document.getElementById("periodo_site").innerHTML = "Período: Tarde"
        return "Tarde";
    }
}

setInterval(carregarDados, 300000); //carrega a pagina a cada 5min
carregarDados(); // Chama a função ao carregar a página
