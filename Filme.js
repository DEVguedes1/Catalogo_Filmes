class Filme {
    #titulo;
    #genero;
    #estudio;
    #anoDeLancamento;
    #duracao;
    #nota;

    constructor(titulo, genero, estudio, anoDeLancamento, duracao, nota) {
        this.#titulo = titulo;
        this.#genero = genero;
        this.#estudio = estudio;
        this.#anoDeLancamento = anoDeLancamento;
        this.#duracao = duracao;
        this.#nota = nota;
    }

    static fromJSON(dados) {
        if (!dados) return null;

        return new Filme(
            dados.titulo,
            dados.genero,
            dados.estudio,
            dados.anoDeLancamento,
            dados.duracao,
            dados.nota
        );
    }

    toJSON() {
        return {
            titulo: this.titulo,
            genero: this.genero,
            estudio: this.estudio,
            anoDeLancamento: this.anoDeLancamento,
            duracao: this.duracao,
            nota: this.nota,
        };
    }

    get titulo() {
        return this.#titulo;
    }

    get genero() {
        return this.#genero;
    }

    get estudio() {
        return this.#estudio;
    }

    get anoDeLancamento() {
        return this.#anoDeLancamento;
    }

    get duracao() {
        return this.#duracao;
    }

    get nota() {
        return this.#nota;
    }

    set titulo(value) {
        this.#titulo = value;
    }

    set genero(value) {
        this.#genero = value;
    }

    set estudio(value) {
        this.#estudio = value;
    }

    set anoDeLancamento(value) {
        this.#anoDeLancamento = value;
    }

    set duracao(value) {
        this.#duracao = value;
    }

    set nota(value) {
        this.#nota = value;
    }
}

 