d3.csv("https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-states.csv")
    .then(geraGrafico)

    function geraGrafico(dados){   
        const dadosUteis = dados.map((dados) => {return [dados.state, dados.vaccinated, dados.date]})
         

        datas = []
        datasTratadas = []
        numeroVacinados = []

        

        dadosUteis.forEach((lista, i) => {
           if (lista[1] != "" && lista[0] == "TOTAL"){
            datas.push(lista[2])
            numeroVacinados.push(lista[1])

           } 
        });

        for (let data in datas){
            let letData = new Date(datas[data])
            let dataFormatada = letData.getDate() + '/' + (letData.getUTCMonth() + 1) + '/' + letData.getFullYear()
            datas[data] = dataFormatada
            datasTratadas.push(datas[data])
        }



        const ontem = datasTratadas[datasTratadas.length - 1]
        const vacinadosOntem = numeroVacinados[numeroVacinados.length - 1]
        const vacinadosAnteontem = numeroVacinados[numeroVacinados.length - 2]
        const vacinadosDiferenca = vacinadosOntem - vacinadosAnteontem

        
        
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels:datas,
        datasets: [{
            label: 'Pessoas vacinadas no país',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: numeroVacinados
        }]
    },

    // Configuration options go here
    options: {}
});


let legenda = document.getElementById('legenda')
legenda.innerText = `O Brasil vacinou ${vacinadosDiferenca} pessoas nas últimas 24h.`

    }