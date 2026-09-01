const gerenciador = new GerenciadorDeFilmes();
const form = document.getElementById("movie-form");

const inputTitulo = document.getElementById("titulo");
const inputGenero = document.getElementById("genero");
const inputEstudio = document.getElementById("estudio");
const inputAnoDeLancamento = document.getElementById("ano");
const inputDuracao = document.getElementById("duracao");
const inputNota = document.getElementById("nota");

// Carrega os filmes do armazenamento antes de qualquer operação de cadastro.
document.addEventListener("DOMContentLoaded", () => {
    gerenciador.carregarDoLocalStorage();
});

// Valida e registra um novo filme no catálogo.
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const titulo = inputTitulo.value.trim();
    const genero = inputGenero.value.trim();
    const estudio = inputEstudio.value.trim();
    const anoDeLancamento = parseInt(inputAnoDeLancamento.value, 10);
    const duracao = parseInt(inputDuracao.value, 10);
    const nota = parseFloat(inputNota.value);

    if (
        titulo === "" ||
        genero === "" ||
        estudio === "" ||
        Number.isNaN(anoDeLancamento) ||
        anoDeLancamento < 1888 ||
        anoDeLancamento > 2030 ||
        Number.isNaN(duracao) ||
        duracao < 1 ||
        Number.isNaN(nota) ||
        nota < 0 ||
        nota > 10
    ) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    const novoFilme = new Filme(titulo, genero, estudio, anoDeLancamento, duracao, nota);

    gerenciador.adicionarFilme(novoFilme);
    gerenciador.salvarNoLocalStorage();

    console.log("Filme cadastrado:", novoFilme);
    console.log("Lista atual:", gerenciador.filmes);

    form.reset();
    alert("Filme cadastrado com sucesso!");
});
