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
            Number.isFinite(Number(dados.duracao)) ? Number(dados.duracao) : Filme.parseDuracaoEmMinutos(dados.duracao),
            dados.nota
        );
    }

    static parseDuracaoEmMinutos(valor) {
        if (valor === null || valor === undefined || valor === "") {
            return 0;
        }

        const texto = String(valor).trim().toLowerCase();
        const padraoHoraMinuto = /^([0-9]+)\s*[:h]\s*([0-9]{1,2})(?:\s*(?:m|min|minutes?)?)?$/;
        const padraoMinuto = /^([0-9]+)\s*(?:m|min|minutes?)$/;

        if (padraoHoraMinuto.test(texto)) {
            const [, horas, minutos] = texto.match(padraoHoraMinuto);
            return Number(horas) * 60 + Number(minutos);
        }

        if (padraoMinuto.test(texto)) {
            const [, minutos] = texto.match(padraoMinuto);
            return Number(minutos);
        }

        const numero = Number(texto);
        if (Number.isFinite(numero)) {
            return numero;
        }

        return 0;
    }

    static formatarDuracaoEmTexto(minutos) {
        const totalMinutos = Number(minutos);

        if (!Number.isFinite(totalMinutos) || totalMinutos < 0) {
            return "0h 00m";
        }

        const horas = Math.floor(totalMinutos / 60);
        const minutosRestantes = totalMinutos % 60;

        if (horas === 0) {
            return `${minutosRestantes}m`;
        }

        return `${horas}h ${String(minutosRestantes).padStart(2, "0")}m`;
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

 