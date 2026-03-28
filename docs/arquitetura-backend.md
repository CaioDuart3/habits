# 🏛️ Arquitetura Backend (Servidor): 

Este documento descreve a organização e a estrutura de pastas do projeto, baseada em uma arquitetura de **responsabilidade única** e **separação de preocupações**.

## 📂 Estrutura de Pastas

Abaixo está a representação visual do diretório principal `src/`, onde reside todo o código-fonte:

```
src/
├── models/           # Definição das estruturas de dados (Classes/Interfaces)
├── repositories/     # Persistência e manipulação direta dos dados
├── controllers/      # Lógica de controle e tratamento de Requisição/Resposta
├── routers/          # Definição das rotas e verbos HTTP (GET, POST, etc.)
├── app.ts            # Configuração central e middlewares (Espinha Dorsal)
└── server.ts         # Inicialização do servidor (Motor de arranque)
```

---

## 🏗️ Camadas da Arquitetura

A aplicação segue um fluxo de dados unidirecional para garantir que o código seja testável e fácil de manter.

### 1. 🚦 Routers (Roteamento)
É a primeira porta de entrada. O roteador olha para a URL e para o método HTTP (GET, POST, etc.) e decide qual **Controller** deve assumir a tarefa. Ele não executa lógica, apenas direciona o tráfego.

### 2. 🎮 Controllers (Controladores)
Atuam como intermediários entre o mundo externo (HTTP) e a lógica interna.
* Extraem dados de `req.params`, `req.query` e `req.body`.
* Validam informações básicas.
* Chamam as funções do **Repository**.
* Retornam a resposta final (`res.status().json()`) para o cliente.

### 3. 📦 Repositories (Repositórios)
É a camada que "conhece" onde os dados estão guardados (seja em um Array na memória, PostgreSQL, MongoDB, etc.). 
* Contém a lógica de busca, inserção, atualização e exclusão.
* Retorna sempre **Promises**, simulando o comportamento de um banco de dados real.

### 4. 💎 Models (Modelos)
Define o "formato" dos objetos da aplicação. No TypeScript, usamos classes ou interfaces para garantir que um `Customer`, por exemplo, sempre tenha um `id`, `name` e `cpf`.

### 5. 🦴 app.ts (Aplicaçâo)
É o coração da API. Aqui são configurados os middlewares globais:
* `express.json()`: Para ler JSON.
* `morgan()`: Para logs de monitoramento.
* `helmet()` & `cors()`: Para segurança e acessos.
* Tratamento global de erros.

### 6. ⚡ server.ts (Servidor)
Responsável por carregar as variáveis de ambiente (`dotenv`) e colocar o servidor "de pé" em uma porta específica (ex: 3000).

---



## 🛠️ Tecnologias Principais
* **Node.js**: Ambiente de execução.
* **TypeScript**: Tipagem estática para maior segurança no desenvolvimento.
* **Express**: Framework para abstração de rotas e middlewares.
* **Nodemom/TS-Node**: Ferramentas para produtividade em desenvolvimento.
```
