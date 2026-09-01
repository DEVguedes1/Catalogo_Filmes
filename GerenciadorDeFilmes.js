/**
 * GerenciadorDeFilmes
 *
 * Centraliza o estado em memória e a persistência no localStorage.
 * Essa classe é o ponto único de entrada para criar, ler, atualizar e apagar filmes.
 */
class GerenciadorDeFilmes {
    #filmes = [];

    constructor() {
        this.#filmes = [];
    }

    get filmes() {
        return this.#filmes;
    }

    set filmes(novosFilmes) {
        this.#filmes = Array.isArray(novosFilmes) ? novosFilmes : [];
    }

    // Salva a lista atual em localStorage para manter os dados persistentes.
    salvarNoLocalStorage() {
        const filmesSerializados = this.filmes.map((filme) => filme.toJSON());
        localStorage.setItem("gerenciadorDeFilmes", JSON.stringify(filmesSerializados));
    }

    // Carrega os filmes salvos e reconstrói as instâncias da classe Filme.
    carregarDoLocalStorage() {
        const filmesJSON = localStorage.getItem("gerenciadorDeFilmes");

        this.#filmes = [];

        if (!filmesJSON) {
            console.log("Nenhum dado encontrado no localStorage.");
            return;
        }

        try {
            const dados = JSON.parse(filmesJSON);

            if (!Array.isArray(dados)) {
                return;
            }

            dados.forEach((filmeData) => {
                const filmeNormalizado = this.normalizarFilme(filmeData);

                if (filmeNormalizado) {
                    this.adicionarFilme(filmeNormalizado);
                }
            });
        } catch (erro) {
            console.error("Erro ao carregar filmes do localStorage:", erro);
            this.#filmes = [];
        }
    }

    // Garante que qualquer entrada vinda do localStorage tenha campos válidos.
    normalizarFilme(filmeData) {
        if (!filmeData || typeof filmeData !== "object") {
            return null;
        }

        const titulo = String(filmeData.titulo ?? "Título não informado").trim() || "Título não informado";
        const genero = String(filmeData.genero ?? "Gênero não informado").trim() || "Gênero não informado";
        const estudio = String(filmeData.estudio ?? "Estúdio não informado").trim() || "Estúdio não informado";
        const anoDeLancamento = Number(filmeData.anoDeLancamento);
        const duracao = Filme.parseDuracaoEmMinutos(filmeData.duracao);
        const nota = Number(filmeData.nota);

        const filme = new Filme(
            titulo,
            genero,
            estudio,
            Number.isFinite(anoDeLancamento) ? anoDeLancamento : 0,
            Number.isFinite(duracao) ? duracao : 0,
            Number.isFinite(nota) ? nota : 0
        );

        return filme;
    }

    // Adiciona um filme novo, validando se ele é uma instância da classe Filme.
    adicionarFilme(filme) {
        if (filme instanceof Filme) {
            this.#filmes.push(filme);
            return true;
        }

        console.log("O objeto não é uma instância da classe Filme.");
        return false;
    }

    // Retorna uma cópia da lista para evitar alterações externas sem a regra do gerenciador.
    listarFilmes() {
        return [...this.#filmes];
    }

    // Busca um filme pelo índice dentro da lista atual.
    buscarFilmePorIndice(indice) {
        if (indice < 0 || indice >= this.#filmes.length) {
            return null;
        }

        return this.#filmes[indice];
    }

    // Atualiza um filme já existente pelo índice.
    editarFilme(indice, novosDados) {
        const filme = this.buscarFilmePorIndice(indice);

        if (!filme || !novosDados) {
            return false;
        }

        Object.entries(novosDados).forEach(([chave, valor]) => {
            if (Object.prototype.hasOwnProperty.call(filme, chave)) {
                filme[chave] = valor;
            }
        });

        return true;
    }

    // Remove um filme do catálogo pelo índice.
    removerFilme(indice) {
        if (indice < 0 || indice >= this.#filmes.length) {
            return false;
        }

        this.#filmes.splice(indice, 1);
        return true;
    }
}
