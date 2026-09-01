const gerenciador = new GerenciadorDeFilmes();

const filmeSelect = document.getElementById("filme-select");

const form = document.getElementById("edit-form");

const titulo = document.getElementById("titulo");

const genero = document.getElementById("genero");

const estudio = document.getElementById("estudio");

const ano = document.getElementById("ano");

const duracao = document.getElementById("duracao");

const nota = document.getElementById("nota");

gerenciador.carregarDoLocalStorage();


// Cria as opções de filmes no select

gerenciador.filmes.forEach((filme, indice) => {

    const option = document.createElement("option");

    option.value = indice;

    option.textContent = filme.titulo;

    filmeSelect.appendChild(option);

});


// Guarda o filme que o usuário escolher

let filme = null;


// Quando o usuário escolher um filme

filmeSelect.addEventListener("change", () => {

    const indice = filmeSelect.value;

    if (indice === "") {
        filme = null;
        return;
    }

    filme = gerenciador.filmes[parseInt(indice)];


    // Preenche os campos com os dados atuais

    titulo.value = filme.titulo;

    genero.value = filme.genero;

    estudio.value = filme.estudio;

    ano.value = filme.anoDeLancamento;

    duracao.value = filme.duracao;

    nota.value = filme.nota;

});


// Quando clicar em "Salvar Alterações"

form.addEventListener("submit", (event) => {

    event.preventDefault();


    // Verifica se algum filme foi escolhido

    if (!filme) {

        alert("Selecione um filme para editar!");

        return;

    }


    // Pega os novos valores

    filme.titulo = titulo.value.trim();

    filme.genero = genero.value.trim();

    filme.estudio = estudio.value.trim();

    filme.anoDeLancamento = parseInt(ano.value);

    filme.duracao = parseInt(duracao.value);

    filme.nota = parseFloat(nota.value);


    // Salva a alteração

    gerenciador.salvarNoLocalStorage();


    alert("Filme Alterado com sucesso");


    console.log("Filme atualizado:");

    console.log(filme);

});