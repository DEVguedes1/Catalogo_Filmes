const gerenciador = new GerenciadorDeFilmes();

gerenciador.carregarDoLocalStorage();

const movieListContainer = document.getElementById("movie-list");

function renderizarFilmes() {

    movieListContainer.innerHTML = "";

    gerenciador.filmes.forEach(filme => {

        const filmeElement = document.createElement("div");
        filmeElement.classList.add("movie-card");
        filmeElement.innerHTML = `
            <h3>${filme.titulo}</h3>
            <p>Gênero: ${filme.genero}</p>
            <p>Estúdio: ${filme.estudio}</p>
            <p>Ano: ${filme.anoDeLancamento}</p>
            <p>Duração: ${filme.duracao} minutos</p>
            <p class="movie-rating">Nota: ${filme.nota}</p>
        `;

        movieListContainer.appendChild(filmeElement);

    });

}

renderizarFilmes();