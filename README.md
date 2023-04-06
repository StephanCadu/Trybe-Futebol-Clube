# Projeto Trybe Futebol Clube

O TFC é um site informativo sobre partidas e classificações de futebol, nele fui responsável por desenvolver e testar uma API REST que permita um usuáro fazer login, vizualizar, inserir e alterar partidas de futebol!

![image](https://user-images.githubusercontent.com/104599291/230459244-991173f3-af70-43df-8104-180ed68f9aae.png)

## Tecnologias utilizadas

Front-end:


    CSS3, HTML5, ES6, React, React Router


Back-end:


    TypeScript, NodeJS, Express, Docker, JWT, MYSQL, Sequelize


Testes:


    Mocha, Chai, Sinon


## Executando aplicação

Para executar, clone esse repositório com o comando

    git clone git@github.com:StephanCadu/Trybe-Futebol-Clube.git

Entre na raíz do projeto

    cd trybe-futebol-clube
    
Instale as dependências

    npm install
    
**OBS:** Certifique-se de ter o Docker instalado na sua máquina!

Suba a aplicação com o comando

    npm run compose:up:dev
    
Acesse a aplicação na rota

    http://localhost:3000/
    
Visualize os logs do backend com o comando

    docker-compose logs backend -f
    
Rode os testes do backend com o comando

    cd app/backend && npm test

