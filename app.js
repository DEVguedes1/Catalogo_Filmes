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
const inputAnoDeLancamento = document.getElementById("ano");
const inputDuracao = document.getElementById("duracao");
const inputNota = document.getElementById("nota");
const btnAdicionar = document.getElementById("btn-adicionar");

function renderizarFilmes() {
    movieListContainer.innerHTML = '';
    gerenciador.filmes.forEach((filme, index) => {
        const filmeDiv = document.createElement('div');
        filmeDiv.classList.add('movie-card');
        filmeDiv.innerHTML = `
            <h3>${filme.titulo}</h3>
            <p>Gênero: ${filme.genero}</p>
            <p>Estúdio: ${filme.estudio}</p>
            <p>Ano de Lançamento: ${filme.anoDeLancamento}</p>
            <p>Duração: ${filme.duracao} minutos</p>
            <p>Nota: ${filme.nota}</p>
            <button class="btn-remover" data-index="${index}">Remover</button>
        `;
        movieListContainer.appendChild(filmeDiv);
    });

    const btnRemover = document.querySelectorAll('.btn-remover');
    btnRemover.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            gerenciador.filmes.splice(index, 1);
            gerenciador.salvarNoLocalStorage();
            renderizarFilmes();
        }
        );
    });
}

document.addEventListener('DOMContentLoaded', () => {
    gerenciador.carregarDoLocalStorage();
    //renderizarFilmes();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const titulo = inputTitulo.value.trim();
    const genero = inputGenero.value.trim();
    const estudio = inputEstudio.value.trim();
    const anoDeLancamento = parseInt(inputAnoDeLancamento.value);
    const duracao = parseInt(inputDuracao.value);
    const nota = parseFloat(inputNota.value);

    if (titulo === "" || 
        genero === "" || 
        estudio === "" || 
        anoDeLancamento <1888 ||
        anoDeLancamento > 2030 || 
        duracao < 1 ||
        nota < 0 ||
        nota > 10 ||
        isNaN(duracao) || 
        isNaN(nota)) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
    }

    const novoFilme = new Filme(titulo, genero, estudio, anoDeLancamento, duracao, nota);

    gerenciador.adicionarFilme(novoFilme);
    gerenciador.salvarNoLocalStorage();
    
    console.log("Filme cadastrado:");
    console.log(novoFilme);

    console.log("Lista atual:");
    console.log(gerenciador.filmes);

    form.reset();
    //renderizarFilmes();

});
