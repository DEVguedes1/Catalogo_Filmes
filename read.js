const gerenciador = new GerenciadorDeFilmes();
const movieListContainer = document.getElementById("movie-list");

// Carrega o catálogo do localStorage antes de montar o DOM da página inicial.
gerenciador.carregarDoLocalStorage();

// Renderiza cada filme em um card completo com todos os campos relevantes.
function renderizarFilmes() {
    if (!movieListContainer) {
        return;
    }

    movieListContainer.innerHTML = "";

    gerenciador.filmes.forEach((filme, indice) => {
        const filmeElement = document.createElement("article");
        filmeElement.classList.add("movie-card");

        const duracaoFormatada = Filme.formatarDuracaoEmTexto(filme.duracao);

        filmeElement.innerHTML = `
            <div class="movie-card-header">
                <h3>${filme.titulo}</h3>
                <span class="movie-rating">⭐ ${filme.nota}</span>
            </div>
            <p><strong>Gênero:</strong> ${filme.genero}</p>
            <p><strong>Estúdio:</strong> ${filme.estudio}</p>
            <p><strong>Ano:</strong> ${filme.anoDeLancamento}</p>
            <p><strong>Duração:</strong> ${duracaoFormatada}</p>
            <button type="button" class="btn-delete" data-index="${indice}">
                <img src="images/icons8-trash-48.png" alt="Excluir" class="btn-delete-icon" />
                <span>Excluir</span>
            </button>
        `;

        movieListContainer.appendChild(filmeElement);
    });
}

// Delegação de eventos no container para evitar repetir listeners em cada card.
movieListContainer.addEventListener("click", (event) => {
    const botaoExcluir = event.target.closest(".btn-delete");

    if (!botaoExcluir) {
        return;
    }

    const indice = Number.parseInt(botaoExcluir.dataset.index, 10);
    const filme = gerenciador.buscarFilmePorIndice(indice);

    if (!filme) {
        return;
    }

    const confirmar = window.confirm(`Deseja remover "${filme.titulo}" do catálogo?`);

    if (!confirmar) {
        return;
    }

    gerenciador.removerFilme(indice);
    gerenciador.salvarNoLocalStorage();
    renderizarFilmes();
});

renderizarFilmes();