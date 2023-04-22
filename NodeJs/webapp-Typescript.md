# Estrutura básica webapi com node e Typescript

Inicializando o projeto: 
`$ npm init -y`

### Depedências

Instalando as depêndencias:
`$ npm i express cors dotenv helmet morgan express-async-errors`

-   **Express**: webserver que vamos utilizar para a webapi;
-   **CORS**: pacote de segurança necessário para permitir comunicação futura com frontend;
-   **Helmet**: pacote de segurança para dar uma blindada básica na nossa webapi;
-   **DotEnv**: pacote de configuração para cuidar das variáveis de ambiente;
-   **Morgan**: pacote para logging de requisições no terminal;
-   **Express** Async Errors: pacote para conseguir capturar erros assíncronos;

Depois instalamos>
`$ npm i -D typescript ts-node @types/express @types/cors @types/helmet @types/dotenv @types/morgan`

-   **Typescript**: pacote para suporte à typescript no projeto;
-   **TS-Node**: pacote para execução de arquivos TS sem precisar de pré-transpilação;
-   **@types/…**: types dos pacotes que vamos usar, para reconhecimento na ferramente;

### Inicializando Typescript

Depois inicializamos o TypeScript em nosso projeto, o que devemos fazer com o comando abaixo.

`$ npx tsc --init`

Isso irá criar o arquivo tsconfig.json padrão, que eu recomendo que seja personalizado como abaixo.
```js
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src/",
    "moduleResolution": "node",
    "baseUrl": ".",
    "outDir": "./dist/",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "ts-node": { "transpileOnly": true }
}
```
Algumas explicações sobre propriedades alteradas:

-   **target**: diz respeito a versão do JS a ser usada na transpilação;
-   **rootDir**: onde estão os arquivos TS;
-   **outDir**: onde estarão os arquivos JS após transpilação;
-   **ts-node**: configurações específicas do TS-Node, onde coloquei uma configuração que reduz consumo de memória;


### env
Depois criamos um arqiovo `.env` na raiz do projeto:

```js
//# .env, don't commit to repo
PORT=3000
```

### scripts

Criando os scripts:

```js
"scripts": {
  "dev": "npx nodemon src/server.ts --watch 'src/' -e ts",
  "compile": "npx tsc",
  "start": "node ./dist/server.js"
},
```

## Adicionando banco de dados

`npm i mongodb`
`npm i -D @types/mongodb`