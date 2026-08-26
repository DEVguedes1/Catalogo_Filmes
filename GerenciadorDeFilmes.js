/**
 * GerenciadorDeFilmes
 * 
 * Esta classe é responsável por gerenciar uma lista de instâncias da classe Filme.
 * 
 * Métodos de LocalStorage:
 * - salvarNoLocalStorage(): Serializa o array de filmes em JSON e o armazena no 
 *   localStorage do navegador sob a chave "gerenciadorDeFilmes".
 * - carregarDoLocalStorage(): Recupera a string JSON do localStorage, reconstrói 
 *   as instâncias da classe Filme e as adiciona ao gerenciador.
 * 
 * Exemplo de uso:
 * const gerenciador = new GerenciadorDeFilmes();
 * gerenciador.carregarDoLocalStorage(); // Carrega dados salvos anteriormente
 * // ... adicionar filmes ...
 * gerenciador.salvarNoLocalStorage(); // Persiste as alterações
 */
class GerenciadorDeFilmes{
    
    #filmes = [];

    constructor(){
        this.#filmes = [];
    }

    get filmes() {
        return this.#filmes;
    }

    set filmes(novosFilmes) {
        this.#filmes = novosFilmes;
    }

    salvarNoLocalStorage(){
        localStorage.setItem("gerenciadorDeFilmes", JSON.stringify(this.filmes));
    }

    carregarDoLocalStorage(){
        const filmesJSON = localStorage.getItem("gerenciadorDeFilmes");

        if (filmesJSON) {
            const dados = JSON.parse(filmesJSON);
            this.#filmes = []
            dados.forEach(f => {
                const filme = new Filme(
                    f.titulo, 
                    f.genero, 
                    f.estudio, 
                    f.anoDeLancamento, 
                    f.duracao, 
                    f.nota);
                this.adicionarFilme(filme);
                });
        } else {
            console.log("Nenhum dado encontrado no localStorage.");
        }
    }

    adicionarFilme(filme){
        filme instanceof Filme ? 
        this.#filmes.push(filme) : 
        console.log("O objeto não é uma instância da classe Filme.");
    }
    
}