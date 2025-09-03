const spreadsheetId = '19l6EyZDCQFkGCFO2HmBNIVAvs3EdjVgnc9KyQXubWlw';  // ID correto da planilha
const range = 'Dia seguinte_NEW';  // Nome exato da aba

async function carregarDados() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?alt=json&key=AIzaSyB45aJ88-iyQzEMUM7Bk99C5gMb0dEAX_E`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
        throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const plan = data.values;

        

        const container = document.getElementById("cardsResult")
        container.innerHTML=''

        const container2 = document.getElementById("cardsResult2")
        container2.innerHTML=''

        const container3 = document.getElementById("cardsResult3")
        container3.innerHTML=''

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
                const notificacao = document.createElement('a');
                notificacao.classList.add('notificacao');
                notificacao.innerText = "i";
                notificacao.href = "https://docs.google.com/spreadsheets/d/1ohJcndpXt-NyfbErVNiMgjtgTJY4Gxtkfcwp6MC1UmE";
                card.appendChild(notificacao);

                const dayOneNotificacaoC = document.createElement('span');
                dayOneNotificacaoC.classList.add('notificacaoDAYONE_Completude');
                dayOneNotificacaoC.innerText = "D1"
                card.appendChild(dayOneNotificacaoC);
            }

            else if (linha[7] == 'FALSE') {
                const notificacao = document.createElement('a');
                notificacao.classList.add('notificacao');
                notificacao.innerText = "i";
                notificacao.href = "https://docs.google.com/spreadsheets/d/1ohJcndpXt-NyfbErVNiMgjtgTJY4Gxtkfcwp6MC1UmE";
                card.appendChild(notificacao);
            }

            else if (linha[11] == 'yes') {
                const dayOneNotificacao = document.createElement('span');
                dayOneNotificacao.classList.add('notificacaoDAYONE');
                dayOneNotificacao.innerText = "D1"
                card.appendChild(dayOneNotificacao);
            }

            if(linha[2] == "PRÉDIO I")container.appendChild(card)
            if(linha[2] == "PRÉDIO II")container2.appendChild(card)
            if(linha[2] == "PRÉDIO III")container3.appendChild(card)
            
        });

    } catch (error) {
        console.error('Erro ao carregar os dados:', error);
    }
}

setInterval(carregarDados, 300000); //carrega a pagina a cada 5min
carregarDados(); // Chama a função ao carregar a página
