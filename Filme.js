class Filme{
   
    #titulo
    #genero
    #estudio
    #anoDeLancamento
    #duracao
    #nota

    constructor(titulo, genero, estudio,
      anoDeLancamento, duracao,nota  
    ){
        this.#titulo = titulo
        this.#genero = genero
        this.#estudio = estudio
        this.#anoDeLancamento = anoDeLancamento
        this.#duracao = duracao
        this.#nota = nota
    }

    //getter
    get titulo(){
        return this.#titulo
    }

    get genero(){
        return this.#genero
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


    //setters
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

 