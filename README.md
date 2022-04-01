# Digital Account API

<div align="center">
 <a href="https://www.ume.com.br/">
  <img alt="logo" width="200" src="https://assets-global.website-files.com/60c113054112e93527bc6ec1/60c115f6684e466dd3d0d1f9_logo_ume.svg" />
 </a>
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
  
</div>

<p align="center">
  <a href="#page_with_curl-introdução">Introdução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#wave-pré-requisitos">Pré-requisitos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-como-rodar">Como rodar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-recomendações">Recomendações</a>&nbsp;&nbsp;&nbsp;
</p>

<p align='center'>
  <a href="https://insomnia.rest/run/?label=Digital-Account&uri=https%3A%2F%2Fgithub.com%2FMarques537%2Fdigital-account%2Fblob%2Fmaster%2Fdigital-account-insomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>


## :page_with_curl: Introdução

Desafio de criação de uma API Rest de contas digitais que possua os seguintes recuros. 

| Method   | Endpoint                                            | Description                                                                            |
| -------- | --------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **POST**  | /digital-account                                       | Criar uma nova conta digital                                         |
| **POST**  | /transfer                                      | Criar uma nova transferência entre contas                                         |
| **POST**  | /transfer/{document}                                      | Retorna as transações de uma conta                                         |
| **GET**  | /swagger                                      | Retorna documentação no swagger                                        |

- [Dotenv](https://www.npmjs.com/package/dotenv): para variável de ambiente;
- [Nest](https://www.npmjs.com/package/@nestjs/cli): framework para Node.js que fornece recursos robustos para criação de API;
- [brazilian-class-validator](https://www.npmjs.com/package/brazilian-class-validator): para validação de CPF por meio de Decorator;
- [class-validator](https://www.npmjs.com/package/class-validator): para validação de conteúdo de properties de classes no projeto;
- [dayjs](https://www.npmjs.com/package/dayjs) : para manipulação de datas;
- [sqlite3](https://www.npmjs.com/package/sqlite3): banco de dados;
- [typeORM](https://www.npmjs.com/package/typeorm): ORM para facilitar as operações em banco e mapeamento das entidades;
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express): para documentar as rotas da API;
- [jest](https://www.npmjs.com/package/jest): para escrita e execução de testes unitários;
### :wave: Pré-requisitos

> [Node.js](http://nodejs.org/) \
> [VS Code](https://code.visualstudio.com/)

### :rocket: Como rodar

Rodando o projeto:

- Clone o projeto:

  ```sh
  git clone https://github.com/Marques537/digital-account
  ```

- Abra a pasta:

  ```sh
  cd digital-account
  ```

- Instale todos os pacotes via npm:

  ```sh
  npm install
  ```
- Rode o projeto:

  ```sh
  npm run start
  ```

- Build do projeto:

  ```sh
  npm run build
  ```


## :information_source: Recomendações

> [Insomnia](https://insomnia.rest/) - Para fazer requisições 
