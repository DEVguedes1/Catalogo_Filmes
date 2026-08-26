Filme.prototype.toJSON = function() {
    return {
        titulo: this.titulo,
        genero: this.genero,
        estudio: this.estudio,
        anoDeLancamento: this.anoDeLancamento,
        duracao: this.duracao,
        nota: this.nota
    };
}

const gerenciador = new GerenciadorDeFilmes();
const form = document.getElementById('movie-form');
const movieListContainer = document.getElementById('movie-list');

const inputTitulo = document.getElementById("titulo");
const inputGenero = document.getElementById("genero");
const inputEstudio = document.getElementById("estudio");
const inputAnoDeLancamento = document.getElementById("anoDeLancamento");
const inputDuracao = document.getElementById("duracao");
const inputNota = document.getElementById("nota");
const btnAdicionar = document.getElementById("btn-adicionar");


document.addEventListener('DOMContentLoaded', () => {
    gerenciador.carregarDoLocalStorage();
    renderizarFilmes();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const titulo = inputTitulo.value;
    const genero = inputGenero.value;
    const estudio = inputEstudio.value;
    const anoDeLancamento = parseInt(inputAnoDeLancamento.value);
    const duracao = parseInt(inputDuracao.value);
    const nota = parseFloat(inputNota.value);

    const novoFilme = new Filme(titulo, genero, estudio, ano, duracao, nota);

    gerenciador.adicionarFilme(novoFilme);
    gerenciador.salvarNoLocalStorage();
      
    form.reset();
    renderizarFilmes();
    
    const btn = document.getElementById('btn-save');
    const originalText = btn.textContent;

});
