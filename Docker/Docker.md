## Postgres

Fazendo download da imagem:

`docker pull postgres`

Executando a imagem:

`docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=1234 --name auth-postgres postgres`

Para executar comandos nesse container, como por exemplo criar uma nova base, temos o comando exec:

`sudo docker exec auth-postgres psql -c "CREATE DATABASE nameDb" -U postgres`

string conexao: `DATABASE_URL=postgres://postgres:1234@localhost/passport`