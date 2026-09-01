const gerenciador = new GerenciadorDeFilmes();

const filmeSelect = document.getElementById("filme-select");
const form = document.getElementById("edit-form");
const titulo = document.getElementById("titulo");
const genero = document.getElementById("genero");
const estudio = document.getElementById("estudio");
const ano = document.getElementById("ano");
const duracao = document.getElementById("duracao");
const nota = document.getElementById("nota");

let filmeSelecionado = null;

// Carrega os dados atuais do localStorage antes de popular o select e o formulário.
gerenciador.carregarDoLocalStorage();

// Monta as opções do select com os títulos dos filmes já cadastrados.
function popularSelectFilmes() {
    filmeSelect.innerHTML = '<option value="">Escolha um filme</option>';

    gerenciador.filmes.forEach((filme, indice) => {
        const option = document.createElement("option");
        option.value = String(indice);
        option.textContent = filme.titulo;
        filmeSelect.appendChild(option);
    });
}

// Preenche os campos do formulário com os dados do filme selecionado.
function preencherFormulario(filme) {
    if (!filme) {
        return;
    }

    titulo.value = filme.titulo;
    genero.value = filme.genero;
    estudio.value = filme.estudio;
    ano.value = filme.anoDeLancamento;
    duracao.value = Filme.formatarDuracaoEmTexto(filme.duracao).replace("h ", ":").replace("m", "").trim();
    nota.value = filme.nota;
}

// Atualiza o filme em memória e persiste no localStorage.
function salvarAlteracaoDoFilme() {
    if (!filmeSelecionado) {
        alert("Selecione um filme para editar!");
        return;
    }

    const indiceSelecionado = Number.parseInt(filmeSelect.value, 10);

    if (Number.isNaN(indiceSelecionado)) {
        alert("Selecione um filme válido para continuar.");
        return;
    }

    const duracaoEmMinutos = Filme.parseDuracaoEmMinutos(duracao.value);

    const filmeAtualizado = {
        titulo: titulo.value.trim(),
        genero: genero.value.trim(),
        estudio: estudio.value.trim(),
        anoDeLancamento: Number.parseInt(ano.value, 10),
        duracao: duracaoEmMinutos,
        nota: Number.parseFloat(nota.value),
    };

    if (
        filmeAtualizado.titulo === "" ||
        filmeAtualizado.genero === "" ||
        filmeAtualizado.estudio === "" ||
        Number.isNaN(filmeAtualizado.anoDeLancamento) ||
        Number.isNaN(filmeAtualizado.duracao) ||
        Number.isNaN(filmeAtualizado.nota)
    ) {
        alert("Preencha todos os campos corretamente antes de salvar.");
        return;
    }

    const filme = gerenciador.buscarFilmePorIndice(indiceSelecionado);

    if (!filme) {
        alert("Filme não encontrado para edição.");
        return;
    }

    filme.titulo = filmeAtualizado.titulo;
    filme.genero = filmeAtualizado.genero;
    filme.estudio = filmeAtualizado.estudio;
    filme.anoDeLancamento = filmeAtualizado.anoDeLancamento;
    filme.duracao = filmeAtualizado.duracao;
    filme.nota = filmeAtualizado.nota;

    gerenciador.salvarNoLocalStorage();

    alert("Filme alterado com sucesso!");
    console.log("Filme atualizado:", filme);
}

// Quando o usuário escolher um filme no select, o formulário é preenchido.
filmeSelect.addEventListener("change", () => {
    const indice = filmeSelect.value;

    if (indice === "") {
        filmeSelecionado = null;
        form.reset();
        return;
    }

    filmeSelecionado = gerenciador.buscarFilmePorIndice(Number.parseInt(indice, 10));
    preencherFormulario(filmeSelecionado);
});

// Ao enviar o formulário, salva a alteração no catálogo.
form.addEventListener("submit", (event) => {
    event.preventDefault();
    salvarAlteracaoDoFilme();
});

popularSelectFilmes();