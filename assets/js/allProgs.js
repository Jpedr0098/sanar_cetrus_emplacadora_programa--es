const spreadsheetId = '19l6EyZDCQFkGCFO2HmBNIVAvs3EdjVgnc9KyQXubWlw';  // ID correto da planilha
const range = 'DIA SEGUINTE';  // Nome exato da aba

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
        container.innerHTML=''

        const container3 = document.getElementById("cardsResult3")
        container.innerHTML=''

        plan.forEach(linha => {
            if (linha[0] == "Data") {
                document.getElementById("dt_site").innerHTML = `Data: ${linha[11]}`
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

            if (linha[7] == 'FALSE') {
                const notificacao = document.createElement('span');
                notificacao.classList.add('notificacao');
                card.appendChild(notificacao);
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
