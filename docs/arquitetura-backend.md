
# 🏛️ Arquitetura Backend (Servidor)

Este documento descreve a organização do backend do projeto `to_do_list` e como cada camada se conecta.

## 📂 Estrutura de Pastas

O backend é implementado em `backend/src/` com a seguinte estrutura:

```
src/
├── config/           # Configurações de ambiente e conexão com PostgreSQL
├── controllers/      # Recebe requisições HTTP e envia respostas
├── models/           # Definições de tipos e interfaces do domínio
├── repositories/     # Consultas SQL e persistência de dados
├── routes/           # Definição de endpoints e injeção de dependências
├── services/         # Regras de negócio e validações
├── app.ts            # Configuração do Express e middlewares
└── server.ts         # Inicializa o servidor HTTP
```

---

## 🏗️ Camadas da Arquitetura

O backend segue uma arquitetura de responsabilidade única, com fluxo unidirecional:

1. `routes`
2. `controllers`
3. `services`
4. `repositories`
5. `database`

### 🚦 Rotas

O arquivo `backend/src/routes/TaskRoutes.ts` cria o roteamento:

- `GET /tasks` → lista todas as tarefas
- `POST /tasks` → cria uma nova tarefa

A rota injeta as dependências necessárias para `TaskController`.

### 🎮 Controllers

`TaskController` trata a lógica de HTTP:

- extrai dados de `req.body`
- valida os campos obrigatórios
- chama o `TaskService`
- retorna o resultado com status HTTP apropriado

Validações atuais em `create`:

- `title`: string não vazia
- `description`: string não vazia
- `status`: deve ser `pending`, `in-progress` ou `completed`

### 🧠 Services

`TaskService` contém a lógica de domínio e delega a persistência ao repositório.

Funções implementadas:

- `getAllTasks()`
- `getTask(id)`
- `createTask(task)`
- `deleteTask(id)`

### 📦 Repositories

`TaskRepository` usa `pg` para executar SQL no PostgreSQL.

Métodos:

- `findAll()`
- `findById(id)`
- `create(task)`
- `update(task)`
- `deleteById(id)`

A consulta SQL para criação usa `RETURNING *`, retornando o registro completo após inserção.

### 💎 Modelos

`backend/src/models/Task.ts` define a interface `Task`:

```ts
export interface Task {
  id: number
  title: string
  description: string
  status: 'pending' | 'in-progress' | 'completed'
  createdAt: Date
  updatedAt: Date
}
```

Essa tipagem é usada no serviço e no repositório para garantir consistência.

---

## 🔧 Conexão com o Banco de Dados

`backend/src/config/postgres.ts` configura a conexão via `pg.Pool` usando variáveis de ambiente:

- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `DB_HOST`
- `DB_PORT`

O `docker-compose.yml` inicializa o serviço `postgres` e executa `backend/src/config/init.sql` para criar a tabela `tasks`.

---

## 🧩 Fluxo de Requisição

```text
HTTP Request → Route → Controller → Service → Repository → PostgreSQL
```

### `backend/src/app.ts`

Ele registra os middlewares:

- `morgan('tiny')`
- `cors()`
- `helmet()`
- `express.json()`
- rotas de tarefas
- middleware global de tratamento de erro

### `backend/src/server.ts`

Carrega as variáveis de ambiente com `dotenv` e inicia o servidor na porta `PORT` ou `3000`.

---

## 📌 Observações importantes

- O backend está escrito em TypeScript e usa `type: module`.
- A resposta de banco de dados retorna colunas em `snake_case` (`created_at`, `updated_at`) porque o SQL é escrito assim.
- A API atual não expõe rota de atualização ou remoção de tarefas ao frontend.


