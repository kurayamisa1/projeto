document.getElementById("cadastro-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    cadastrarUsuario();
});

function cadastrarUsuario() {
    var nome = document.getElementById("nome").value;
    var sobrenome = document.getElementById("sobrenome").value;
    var email = document.getElementById("email").value;
    var telefone = document.getElementById("telefone").value;
    var senha = document.getElementById("senha").value;
    var confirmarSenha = document.getElementById("confirmar-senha").value;
    var dataNascimento = document.getElementById("data-nascimento").value;
    var documento = document.getElementById("documento").value;

    if (nome === "" || sobrenome === "" || email === "" || telefone === "" || senha === "" || confirmarSenha === "" || dataNascimento === "" || documento === "") {
        document.getElementById("mensagem-cadastro").innerText = "Todos os campos são obrigatórios.";
        return;
    } else {
        document.getElementById("mensagem-cadastro").innerText = "Cadastro realizado com sucesso";
    }

    if (senha !== confirmarSenha) {
        document.getElementById("mensagem-cadastro").innerText = "As senhas não coincidem.";
        return;
    }

    var dataMinima = new Date();
    dataMinima.setFullYear(dataMinima.getFullYear() - 18);
    var dataNascimentoDate = new Date(dataNascimento);
    if (isNaN(dataNascimentoDate) || dataNascimentoDate > dataMinima) {
        document.getElementById("mensagem-cadastro").innerText = "Você deve ter pelo menos 18 anos para se cadastrar.";
        return;
    }
}

function realizarLogin() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

}

function isNumeric(str) {
    return /^\d+$/.test(str);
}

document.getElementById("telefone").addEventListener("input", function() {
    if (!isNumeric(this.value)) {
        this.value = this.value.slice(0, -1);
    }
});

document.getElementById("documento").addEventListener("input", function() {
    if (!isNumeric(this.value)) {
        this.value = this.value.slice(0, -1);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Função para verificar se o usuário está logado e atualizar o botão de login
    function atualizarBotaoLogin() {
        var perfilBtn = document.getElementById("perfil-btn");
        var nomeUsuario = localStorage.getItem("nome");

        if (perfilBtn) {
            if (nomeUsuario) {
                perfilBtn.textContent = "Perfil"; 
                perfilBtn.href = "perfil.html"; 
            } else {
                perfilBtn.textContent = "Login"; 
                perfilBtn.href = "login.html"; 
            }
        }
    }

    atualizarBotaoLogin();

    var perfilBtn = document.getElementById("perfil-btn");
    perfilBtn.addEventListener("click", function(event) {
        if (perfilBtn.textContent === "Login") {
            window.location.href = "login.html";
        } else if (perfilBtn.textContent === "Perfil") {
            window.location.href = "perfil.html";
        }
    });

    var logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            localStorage.clear(); 
            window.location.href = "index.html"; 
        });
    }

    // Exibir mensagem de erro, se houver
    var mensagemErro = localStorage.getItem("mensagemErro");
    if (mensagemErro) {
        document.getElementById("mensagem-erro").innerText = mensagemErro;
        localStorage.removeItem("mensagemErro"); // Limpar a mensagem de erro para que ela não seja exibida novamente após atualizar a página
    }
});
