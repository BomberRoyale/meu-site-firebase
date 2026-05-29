// 1. IMPORTANTE: Adicionado o 'addDoc' no import do firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 2. Sua configuração do Firebase (Mantenha as suas chaves reais aqui)
 const firebaseConfig = {
    apiKey: "AIzaSyApWf-UEQSvbKY44556cCfvPkSDDXcVdZI",
    authDomain: "meu-site-estatico-803c0.firebaseapp.com",
    projectId: "meu-site-estatico-803c0",
    storageBucket: "meu-site-estatico-803c0.firebasestorage.app",
    messagingSenderId: "458136971290",
    appId: "1:458136971290:web:0893b52b8ec26bbe5c49a3"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Mapeando os elementos do HTML
const containerProdutos = document.getElementById("lista-produtos");
const formCadastro = document.getElementById("form-cadastro");

// 3. Função para buscar os dados no banco (Continua igual)
async function buscarProdutos() {
    try {
        const querySnapshot = await getDocs(collection(db, "produtos"));
        containerProdutos.innerHTML = "";

        if (querySnapshot.empty) {
            containerProdutos.innerHTML = "<p class='carregando'>Nenhum produto encontrado.</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const produto = doc.data();
            const cardHTML = `
                <div class="card-produto">
                    <h3>${produto.nome}</h3>
                    <p class="preco">R$ ${Number(produto.preco).toFixed(2)}</p>
                </div>
            `;
            containerProdutos.innerHTML += cardHTML;
        });
    } catch (erro) {
        console.error("Erro ao buscar: ", erro);
    }
}

// 4. NOVA FUNÇÃO: Escutar o envio do formulário e salvar no Firebase
formCadastro.addEventListener("submit", async (event) => {
    event.preventDefault(); // Impede a página de recarregar ao enviar o form

    // Pega os valores digitados nos inputs
    const nomeDigitado = document.getElementById("nome").value;
    const precoDigitado = document.getElementById("preco").value;

    try {
        // Envia para a coleção "produtos" no Firebase
        await addDoc(collection(db, "produtos"), {
            nome: nomeDigitado,
            preco: Number(precoDigitado) // Garante que o preço vai como número e não texto
        });

        alert("Produto cadastrado com sucesso!");
        
        formCadastro.reset(); // Limpa os campos do formulário
        buscarProdutos();     // Atualiza a lista na tela para mostrar o novo produto imediatamente

    } catch (erro) {
        console.error("Erro ao salvar o produto: ", erro);
        alert("Erro ao salvar produto. Verifique as regras de segurança do seu Firebase.");
    }
});

// Executa a busca ao abrir a página
buscarProdutos();