const gerenciador = new GerenciadorDeFilmes();

const form = document.getElementById("movie-form");
const inputTitulo = document.getElementById("titulo");

const mensagemExclusao = document.getElementById("mensagemExclusao");
const textoMensagem = document.getElementById("textoMensagem");
const fecharMensagem = document.getElementById("fecharMensagem");

document.addEventListener("DOMContentLoaded", () => {
    gerenciador.carregarDoLocalStorage();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const tituloParaExcluir = inputTitulo.value.trim();

    if (tituloParaExcluir === "") {
        alert("Por favor, insira o título do filme que deseja excluir.");
        return;
    }

    const excluido = gerenciador.excluirFilmes(tituloParaExcluir);

    if (excluido) {
        gerenciador.salvarNoLocalStorage();
    
        textoMensagem.innerHTML = `
            O filme <strong>"${tituloParaExcluir}"</strong> foi excluído com sucesso! 
            <br><br>
            Filmes restantes: <strong>${gerenciador.filmes.length}</strong>
        `;
    
        mensagemExclusao.classList.add("ativa");
    
        form.reset();
    }
});