# Rust

A principal maneira usada para instalar Rust é através da ferramenta chamada Rustup, que é um instalador e um gerenciador de versões.

Para fazer o download do Rustup e instalar Rust, execute o seguinte comando no seu terminal:

`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

## O Rust está atualizado?

Rust é atualizado com bastante frequência. Se você instalou o Rustup há algum tempo, é possível que sua versão do Rust esteja desatualizada. Baixe a última versão do Rust rodando `rustup update`.

## Cargo: a ferramenta de compilação e gerenciamento de pacotes

Quando Rustup estiver instalado, você também terá a última versão estável da ferramenta de compilação e gerenciamento de pacotes, também conhecida como Cargo. Cargo faz várias tarefas:

compile seu projeto com `cargo build`
execute seu projeto com `cargo run`
teste seu projeto com `cargo test`
gere a documentação do seu projeto com `cargo doc`
publique sua biblioteca em crates.io com `cargo publish`
Para verificar que Rust e Cargo estão instalados no seu computador, abra o seu terminal favorito e digite:

`cargo --version`

## Outras ferramentas (VsCode)

Suporte a Rust está disponível em vários editores:

VS CODE : `rust-analyzer`

## Criando um novo projeto

Para começar, usaremos o Cargo para criar um projeto. No seu terminal, execute:

`cargo new hello-rust`

Isso criara um novo diretório chamado hello-rust com os seguintes arquivos:

```rust
hello-rust
|- Cargo.toml
|- src
  |- main.rs
```

`Cargo.toml` é o manifesto de um projeto Rust. Aqui você encontra todos os metadados do projeto, assim como as declarações de dependência.

`src/main.rs` é onde nos vamos escrever nossa aplicação.

`cargo new` gera um projeto "Hello, world!" para você!

Você pode executar esse programa entrando no diretório recém criado e executando o seguinte no seu terminal:

`cargo run`

## Adicionando dependências

Vamos adicionar uma dependência na nossa aplicação. Você pode encontrar todo tipo de bibliotecas em `crates.io`, o registro de pacotes para projetos Rust. Nós geralmente chamamos bibliotecas de “crates”.

Nesse projeto vamos usar uma crate chamada `ferris-says`.

Em nosso arquivo `Cargo.toml` vamos adicionar a seguinte informação (que pegamos na página da crate):

```rust
[dependencies]
ferris-says = "0.2"
```

Agora podemos rodar:

`cargo build`
...e Cargo irá instalar a dependência pra nós.

Você verá que ao rodar esse comando um novo arquivo chamado `Cargo.lock` foi criado. Esse arquivo contém uma lista com as versões exatas de todas as dependências usadas localmente.

Para usar essa dependência, podemos abrir o arquivo `main.rs`, remover tudo que está no arquivo (era só mais um exemplo), e adicionar a seguinte linha:

`use ferris_says::say;`
Essa linha significa que podemos usar a função say que a crate ferris-says exporta.

## Uma pequena aplicação em Rust

Agora vamos escrever uma pequena aplicação com a nossa nova dependência. No nosso arquivo `main.rs`, adicione o seguinte código:

```rust
use ferris_says::say; // from the previous step
use std::io::{stdout, BufWriter};

fn main() {
    let stdout = stdout();
    let message = String::from("Hello fellow Rustaceans!");
    let width = message.chars().count();

    let mut writer = BufWriter::new(stdout.lock());
    say(message.as_bytes(), width, &mut writer).unwrap();
}
```

Após salvar, podemos executar nossa aplicação com o seguinte comando:

`cargo run`


