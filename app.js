// 1. Importando as funções necessárias dos SDKs do Firebase via CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 2. SUA CONFIGURAÇÃO DO FIREBASE (Substitua pelos seus dados reais aqui)
 const firebaseConfig = {
    apiKey: "AIzaSyApWf-UEQSvbKY44556cCfvPkSDDXcVdZI",
    authDomain: "meu-site-estatico-803c0.firebaseapp.com",
    projectId: "meu-site-estatico-803c0",
    storageBucket: "meu-site-estatico-803c0.firebasestorage.app",
    messagingSenderId: "458136971290",
    appId: "1:458136971290:web:0893b52b8ec26bbe5c49a3"
  };

// 3. Inicializando o Firebase e o Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 4. Mapeando o elemento HTML onde os produtos vão aparecer
const containerProdutos = document.getElementById("lista-produtos");

// 5. Função assíncrona para buscar os dados no banco
async function buscarProdutosdoFirebase() {
    try {
        // Busca todos os documentos da coleção "produtos"
        const querySnapshot = await getDocs(collection(db, "produtos"));
        
        // Limpa o texto de "Carregando..."
        containerProdutos.innerHTML = "";

        // Se a coleção estiver vazia
        if (querySnapshot.empty) {
            containerProdutos.innerHTML = "<p class='carregando'>Nenhum produto encontrado no banco de dados.</p>";
            return;
        }

        // Passa por cada documento retornado do banco
        querySnapshot.forEach((doc) => {
            const produto = doc.data(); // Extrai os dados (nome, preco, etc.)

            // Cria a estrutura HTML do card do produto
            const cardHTML = `
                <div class="card-produto">
                    <h3>${produto.nome}</h3>
                    <p class="preco">R$ ${Number(produto.preco).toFixed(2)}</p>
                </div>
            `;

            // Injeta o card dentro do container no HTML
            containerProdutos.innerHTML += cardHTML;
        });

    } catch (erro) {
        console.error("Erro ao buscar dados do Firebase: ", erro);
        containerProdutos.innerHTML = "<p class='carregando' style='color: red;'>Erro ao carregar produtos. Verifique o console.</p>";
    }
}

// 6. Executa a função assim que a página termina de carregar
buscarProdutosdoFirebase();