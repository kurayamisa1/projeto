document.addEventListener("DOMContentLoaded", function() {

    function carregarInfoUsuario() {
        var nomeSpan = document.getElementById("nome");
        var emailSpan = document.getElementById("email");
        var dataNascimentoSpan = document.getElementById("data-nascimento");
        var generoSpan = document.getElementById("genero");
        var nacionalidadeSpan = document.getElementById("nacionalidade");

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "perfil-info", true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                nomeSpan.textContent = data.nome;
                emailSpan.textContent = data.email;
                dataNascimentoSpan.textContent = data.dataNascimento;
                generoSpan.textContent = data.genero;
                nacionalidadeSpan.textContent = data.nacionalidade;
            }
        };
        xhr.send();
    }

    carregarInfoUsuario();


    var logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            localStorage.clear(); 
            
            window.location.href = "index.html"; 
        });
    }


    var inicioBtn = document.getElementById("inicio-btn");
    if (inicioBtn) {
        inicioBtn.addEventListener("click", function() {
            window.location.href = "index.html"; 
        });
    }
});
