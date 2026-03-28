Aqui está o resumo do tutorial focado no setup e arquitetura apresentados no vídeo:

# express

# 1- npm init -y
Cria o ficheiro de configuração `package.json` com os valores padrão. [[03:31](http://www.youtube.com/watch?v=Ler1-DLbVSQ&t=211)]

# 2- npm i <pacote>
Instala as dependências necessárias para o projeto.

**Ex de dependências de produção:**
`npm install express helmet cors dotenv morgan` [[05:06](http://www.youtube.com/watch?v=Ler1-DLbVSQ&t=306)]
* **express**: Framework web.
* **helmet**: Segurança (proteção contra ataques comuns).
* **cors**: Permite acesso de diferentes origens (frontend).
* **dotenv**: Gestão de variáveis de ambiente.
* **morgan**: Log de requisições no terminal.

**Ex de dependências de desenvolvimento:**
`npm install -D typescript ts-node nodemon @types/express @types/cors @types/helmet @types/dotenv @types/morgan` [[08:15](http://www.youtube.com/watch?v=Ler1-DLbVSQ&t=495)]
* **typescript**: Compilador da linguagem.
* **ts-node**: Executa ficheiros TypeScript diretamente.
* **nodemon**: Reinicia o servidor automaticamente ao alterar o código.
* **@types/**: Definições de tipos para as bibliotecas JS.

# 3- setup do typescript

**npx tsc --init**
Inicializa as configurações do TypeScript criando o ficheiro `tsconfig.json`. [[11:50](http://www.youtube.com/watch?v=Ler1-DLbVSQ&t=710)]

**3.1 Configurar raiz do diretório**
No `tsconfig.json`, definir `"rootDir": "./src"`. Os ficheiros de código devem ficar na pasta `src`. [[12:42](http://www.youtube.com/watch?v=Ler1-DLbVSQ&t=762)]

**3.2 Dist**
Definir `"outDir": "./dist"`. É onde os ficheiros convertidos para JavaScript serão guardados. [[14:27](http://www.youtube.com/watch?v=Ler1-DLbVSQ&t=867)]

**3.3 ts-node**
Adicionar configuração no final do `tsconfig.json` para performance: `"ts-node": { "transpileOnly": true }`. [[15:36](http://www.youtube.com/watch?v=Ler1-DLbVSQ&t=936)]

# 4- Arquitetura e Configurações Adicionais

**Estrutura de Pastas (dentro de /src):** [[21:02](http://www.youtube.com/watch?v=Ler1-DLbVSQ&t=1262)]
* `models/`: Estruturas de dados (Classes).
* `repositories/`: Manipulação e persistência de dados (Banco de dados/Arrays).
* `controllers/`: Lógica de controle, validação e ponte entre HTTP e Repositório.
* `routers/`: Definição das rotas e verbos HTTP.
* `app.ts`: Espinha dorsal da aplicação (middlewares e plug-ins).
* `server.ts`: Ponto de entrada (start do servidor e porta).

**Scripts no package.json:** [[29:25](http://www.youtube.com/watch?v=Ler1-DLbVSQ&t=1765)]
* `"dev": "npx nodemon --watch src --exec ts-node src/server.ts"`: Para usar durante o desenvolvimento.

**Variáveis de Ambiente (.env):** [[16:43](http://www.youtube.com/watch?v=Ler1-DLbVSQ&t=1003)]
* Criar ficheiro `.env` na raiz com `PORT=3000`.

**Git Ignore (.gitignore):** [[17:49](http://www.youtube.com/watch?v=Ler1-DLbVSQ&t=1069)]
* Adicionar `node_modules`, `.env` e `dist` para não serem enviados para o repositório.



# React typescript

feito com vite utilizando o comando:
npm create vite@latest

documentação

