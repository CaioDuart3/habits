
# 🏛️ Arquitetura Backend (Servidor)

Este documento descreve a organização e a estrutura de pastas do projeto, baseada em uma arquitetura de **responsabilidade única** e **separação de preocupações**.

## 📂 Estrutura de Pastas

Representação do diretório principal `src/`, onde reside todo o código-fonte da aplicação:

```

src/
├── config/           # Configurações gerais (banco, variáveis de ambiente, etc.)
├── models/           # Definição das entidades e tipos da aplicação
├── repositories/     # Camada de acesso e persistência de dados
├── services/         # Regras de negócio da aplicação
├── controllers/      # Manipulação de requisição e resposta HTTP
├── routers/          # Definição das rotas e associação com controllers
├── app.ts            # Configuração da aplicação e middlewares globais
└── server.ts         # Inicialização do servidor HTTP

```

---

## 🏗️ Camadas da Arquitetura

A aplicação segue um fluxo de dados **unidirecional**, garantindo organização, testabilidade e facilidade de manutenção.

### 🚦 Routers (Roteamento)

Responsáveis por mapear **rotas HTTP** para os controllers correspondentes.

Funções principais:

- Definir endpoints da API.
- Associar métodos HTTP (`GET`, `POST`, `PUT`, `DELETE`) aos controllers.
- Encaminhar a requisição sem executar lógica de negócio.

Exemplo:

```ts
router.post("/tasks", controller.create)
````

---

### 🎮 Controllers (Controladores)

Intermediários entre a camada HTTP e a lógica da aplicação.

Responsabilidades:

* Receber e interpretar requisições.
* Extrair dados de:

  * `req.params`
  * `req.query`
  * `req.body`
* Chamar os **services** responsáveis pela lógica de negócio.
* Retornar a resposta HTTP adequada (`res.status().json()`).

Exemplo de fluxo dentro de um controller:

```ts
const { title } = req.body
const task = await service.createTask(title)
return res.status(201).json(task)
```

---

### 🧠 Services (Regras de Negócio)

Contêm a **lógica central da aplicação**.

Responsabilidades:

* Validar dados recebidos.
* Aplicar regras de negócio.
* Coordenar operações envolvendo múltiplos repositórios.
* Delegar operações de persistência para os **repositories**.

Essa camada evita que regras de negócio fiquem espalhadas nos controllers.

---

### 📦 Repositories (Repositórios)

Responsáveis pelo **acesso e manipulação de dados**.

Funções principais:

* Buscar registros
* Criar registros
* Atualizar registros
* Remover registros

A camada de repository abstrai a origem dos dados, permitindo trocar facilmente o mecanismo de persistência (ex: memória → PostgreSQL).

Exemplo de métodos comuns:

```
findAll()
findById(id)
create(data)
update(id, data)
delete(id)
```

Todos os métodos retornam **Promises**, simulando o comportamento de acesso a banco de dados.

---

### 💎 Models (Modelos)

Definem as **entidades da aplicação** e a estrutura dos dados.

No TypeScript, geralmente são representadas por:

* `interface`
* `type`
* `class`

Exemplo:

```ts
export interface Task {
  id: number
  title: string
  description: string
  status: string
  createdAt: Date
  updatedAt: Date
}
```

Esses modelos garantem **tipagem consistente** em toda a aplicação.

---

### 🦴 app.ts (Aplicação)

Arquivo responsável pela **configuração central da aplicação Express**.

Configurações comuns:

* Middlewares globais
* Configuração de rotas
* Segurança e logging
* Tratamento global de erros

Exemplo de middlewares:

* `express.json()` → parsing de JSON
* `morgan()` → logs de requisições
* `helmet()` → segurança HTTP
* `cors()` → controle de acesso entre origens

---

### ⚡ server.ts (Servidor)

Responsável por **inicializar o servidor HTTP**.

Funções principais:

* Carregar variáveis de ambiente (`dotenv`)
* Definir a porta da aplicação
* Iniciar o servidor Express

Exemplo:

```ts
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

---

## 🔄 Fluxo da Aplicação

```
HTTP Request
     ↓
Router
     ↓
Controller
     ↓
Service
     ↓
Repository
     ↓
Database
```

Cada camada possui uma responsabilidade clara, garantindo uma arquitetura modular e escalável.


