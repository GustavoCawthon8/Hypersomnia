document.addEventListener("DOMContentLoaded", loadSavedApis);

function loadSavedApis() {
    const savedApis = JSON.parse(localStorage.getItem("apis")) || [];
    const select = document.getElementById("saveApis"); // Correção do ID
    select.innerHTML = '<option value="">Escolha uma API salva...</option>';
    savedApis.forEach(api => {
        const option = document.createElement("option");
        option.value = api;
        option.textContent = api;
        select.appendChild(option);
    });
}

function selectSavedApi() {
    document.getElementById("apiUrl").value = document.getElementById("saveApis").value;
}

function saveApi() {
    const apiUrl = document.getElementById("apiUrl").value;
    if (!apiUrl) return alert("Insira uma API para salvar!");
    let savedApis = JSON.parse(localStorage.getItem("apis")) || [];
    if (!savedApis.includes(apiUrl)) {
        savedApis.push(apiUrl);
        localStorage.setItem("apis", JSON.stringify(savedApis));
        loadSavedApis();
    }
}

async function testarApi() {
    const url = document.getElementById("apiUrl").value;
    const method = document.getElementById("method").value;
    const headersInput = document.getElementById("headers").value;
    const bodyInput = document.getElementById("body").value;

    if (!url) return alert("Insira uma URL de API!");

    let headers = {};
    try {
        headers = headersInput ? JSON.parse(headersInput) : {};
    } catch (e) {
        alert("Headers inválidos! Certifique-se de que está no formato JSON.");
        return;
    }

    let body = null;
    if (method !== "GET" && bodyInput.trim() !== "") {
        try {
            body = JSON.parse(bodyInput);
        } catch (e) {
            alert("Corpo da requisição inválido! Certifique-se de que está no formato JSON.");
            return;
        }
    }

    try {
        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null
        });

        const responseData = await response.json();
        document.getElementById("resposta").value = JSON.stringify(responseData, null, 2);
    } catch (error) {
        document.getElementById("resposta").value = "Erro ao chamar API: " + error.message;
    }
}