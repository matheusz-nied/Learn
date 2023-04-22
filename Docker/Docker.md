## Postgres

Fazendo download da imagem:

`docker pull postgres`

Executando a imagem:

`docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=1234 --name sequelize-postgres postgres`

Para executar comandos nesse container, como por exemplo criar uma nova base, temos o comando exec:

`sudo docker exec sequelize-postgres psql -c "CREATE DATABASE testedb" -U postgres`