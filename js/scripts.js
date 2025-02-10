const botaoTema = document.querySelector("#temaCheckbox");
const imgBackground = document.querySelector("#img-bg");
const contador = document.querySelector("#contador");
const textoRodape = document.querySelector("#textoRodape");
const caixaDeNotas = document.querySelector("#caixaDeNotas");
const numeroContador = document.querySelector("#numeroContador");
const body = document.querySelector("body");

const botaoAll = document.querySelector("#botaoAll")
const botaoActive = document.querySelector("#botaoActive")
const botaoCompleted = document.querySelector("#botaoCompleted")
const botaoLimparCumpridos = document.querySelector("#botaoLimparCumpridos")

const inputAdicionarNota = document.querySelector("#digiteAqui")

let contanotas = 0


botaoTema.addEventListener('click', (evento) => {
    const unidadeModoClaro = document.querySelectorAll(".unidadeModoClaro");
    const opcoes = document.querySelectorAll(".opcoes");
    const borderRadius = document.querySelectorAll(".borderRadius");
    const textoNotas = document.querySelectorAll(".textoNotas");
    const botaoCheck = document.querySelectorAll(".botaoCheck");

    const estadoBotaoTema = evento.target.checked;
    if (estadoBotaoTema) {
        imgBackground.classList.add("img-bg-light");
        body.style.backgroundColor = "#e4e5f1";
        unidadeModoClaro.forEach(notaUnidade => {
            notaUnidade.style.backgroundColor = "#fafafa";
            notaUnidade.style.borderColor = "#d2d3db";
        });
        opcoes.forEach(opcoesFilhos => {
            opcoesFilhos.classList.add("opcoesLightMode");
        });
        contador.style.color = "#9394a5";
        borderRadius.forEach(borderRadiusLightMode => {
            borderRadiusLightMode.classList.add("borderRadiusLightMode");
        });
        textoNotas.forEach(textoNota => {
            textoNota.classList.add("textoNotasLightMode");
        });
        botaoCheck.forEach(check => {
            check.style.borderColor = "#d2d3db";
        });
        textoRodape.style.color = "#9394a5";
        caixaDeNotas.classList.add("caixaDeNotasLightMode");

    } else {
        imgBackground.classList.remove("img-bg-light");
        body.style.backgroundColor = "#161722";
        unidadeModoClaro.forEach(notaUnidade => {
            notaUnidade.style.backgroundColor = "#25273c";
            notaUnidade.style.borderColor = "#4d5066"
        });
        opcoes.forEach(opcoesFilhos => {
            opcoesFilhos.classList.remove("opcoesLightMode");
        });
        contador.style.color = "#4d5066";
        borderRadius.forEach(borderRadiusLightMode => {
            borderRadiusLightMode.classList.remove("borderRadiusLightMode");
        });
        textoNotas.forEach(textoNota => {
            textoNota.classList.remove("textoNotasLightMode");
        });
        botaoCheck.forEach(check => {
            check.style.borderColor = "#4d5066";
        });
        textoRodape.style.color = "#4d5066"
        caixaDeNotas.classList.remove("caixaDeNotasLightMode");
    }
});

inputAdicionarNota.addEventListener('keydown', (evento) => {
    if (evento.key !== "Enter") return;
    if (!evento.target.value) return;


    const liNotaUnidade = document.createElement("li");
    liNotaUnidade.classList.add("notaUnidade", "unidadeModoClaro");

    const timestamp = Date.now();

    const inputNotaUnidade = document.createElement("input");
    inputNotaUnidade.classList.add("todosCheckBox");
    inputNotaUnidade.id = `checkbox${timestamp}`;
    inputNotaUnidade.type = "checkbox";

    const labelNotaUnidade = document.createElement("label");
    labelNotaUnidade.classList.add("botaoCheck");
    labelNotaUnidade.setAttribute('for', `checkbox${timestamp}`);

    const divNotaUnidade = document.createElement("div");
    divNotaUnidade.classList.add("borderRadius");

    const spanNotaUnidade = document.createElement("span");
    spanNotaUnidade.classList.add("textoNotas");
    spanNotaUnidade.textContent = evento.target.value;

    const buttonNotaUnidade = document.createElement("button");
    buttonNotaUnidade.classList.add("removerNota");

    const imgNotaUnidade = document.createElement("img");
    imgNotaUnidade.src = "images/icon-cross.svg";
    imgNotaUnidade.alt = "cross-button";


    const estadoBotaoTema = botaoTema.checked;
    if (estadoBotaoTema) {
        liNotaUnidade.style.backgroundColor = "#fafafa";
        liNotaUnidade.style.borderColor = "#d2d3db";

        divNotaUnidade.classList.add("borderRadiusLightMode");
        labelNotaUnidade.style.borderColor = "#d2d3db";
        spanNotaUnidade.classList.add("textoNotasLightMode");
    }

    caixaDeNotas.appendChild(liNotaUnidade);

    liNotaUnidade.appendChild(inputNotaUnidade);

    liNotaUnidade.appendChild(labelNotaUnidade);
    labelNotaUnidade.appendChild(divNotaUnidade);

    liNotaUnidade.appendChild(spanNotaUnidade);

    liNotaUnidade.appendChild(buttonNotaUnidade);
    buttonNotaUnidade.appendChild(imgNotaUnidade);

    evento.target.value = "";

    atualizarContador();
});

caixaDeNotas.addEventListener('click', (evento) => {
    if (evento.target.tagName !== "BUTTON") return;
    evento.target.parentElement.remove();

    atualizarContador();
});

const atualizarContador = () => {
    let quantidadeAtualNotas = 0;
    [...caixaDeNotas.children].forEach(notaUnidade => {
        const notaUnidadeEstilos = window.getComputedStyle(notaUnidade)
        if(notaUnidadeEstilos.display === "flex"){
            quantidadeAtualNotas++;
        }
    });
    numeroContador.textContent = quantidadeAtualNotas;
}

const limparFiltro = () => {
    document.querySelector("#botaoAll").classList.remove("filtroSelecionado");
    document.querySelector("#botaoActive").classList.remove("filtroSelecionado");
    document.querySelector("#botaoCompleted").classList.remove("filtroSelecionado");
}

botaoAll.addEventListener('click', (evento) => {
    limparFiltro();
    evento.target.classList.add("filtroSelecionado");
    [...caixaDeNotas.children].forEach(notaUnidade => notaUnidade.style.display = "flex");
    atualizarContador()
});

botaoActive.addEventListener('click', (evento) => {
    limparFiltro();
    evento.target.classList.add("filtroSelecionado");
    [...caixaDeNotas.children].forEach(notaUnidade => {

        if(notaUnidade.firstChild.checked){
            notaUnidade.style.display = "none";
        } else {
            notaUnidade.style.display = "flex";
        }
    });
    atualizarContador()
});

botaoCompleted.addEventListener('click', (evento) => {
    limparFiltro();
    evento.target.classList.add("filtroSelecionado");
    [...caixaDeNotas.children].forEach(notaUnidade => {

        if(notaUnidade.firstChild.checked){
            notaUnidade.style.display = "flex";
        } else {
            notaUnidade.style.display = "none";
        }       
    })
    atualizarContador()
});

botaoLimparCumpridos.addEventListener('click', (evento) => {
    [...caixaDeNotas.children].forEach(notaUnidade => {
        if(notaUnidade.firstChild.checked) {
            notaUnidade.remove()
        }
    });
    atualizarContador()
});



