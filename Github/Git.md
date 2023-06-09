# Git
- [Versionando seu código com Git](#Versionando-seu-código-com-Git)
- [Compartilhando seu código através do GitHub](#Compartilhando-seu-código-através-do-GitHub)
- [A área de stage](#A-área-de-stage)
- [Ignorando arquivos](#Ignorando-arquivos)
- [Gravando arquivos no repositório](#Gravando-arquivos-no-repositório)
- [Verificando o histórico do seu repositório](#Verificando-o-histórico-do-seu-repositório)
- [Desfazendo mudanças](#Desfazendo-mudanças)
- (Alterando e removendo os repositórios remotos)[#Alterando-e-removendo-os-repositórios-remotos]
- (## Enviando os commits do projeto para o GitHub)[#Enviando-os-commits-do-projeto-para-o-GitHub]
- (Organizando o trabalho com branches)[#Organizando-o-trabalho-com-branches]
- (Criando uma branch)[#Criando-uma-branch]
- (Mesclando alterações)[#Mesclando-alterações]

## Versionando seu código com Git
### Instalando

Para instalar o Git no Ubuntu, ou em uma outra distribuição baseada em
Debian, execute em um terminal:

`$ sudo apt-get install git`

É importante nos identificarmos para o Git, informando nosso nome e
e-mail. Em um terminal, execute os comandos a seguir:
`$ git config --global user.name "Fulano da Silva"`

`$ git config --global user.email fulanodasilva.git@gmail.com`

Claro, utilize seu nome e e-mail!

### Iniciando

Para transformar o diretório atual em um repositório do Git, basta exe-
cutar o comando git init :

`$ git init`

Podemos executar `$ git init diretorio` se quisermos criar um diretório vazio que já é um repositório Git, ou seja, que já possui o .git .

Como saber se nosso arquivo está versionado?
Podemos ver a situação dos arquivos no repositório Git com o comando:
`$ git status`

Para que o arquivo seja rastreado, devemos executar o seguinte comando:

`$ git add file.txt`

Para gravarmos as mudanças no repositório, devemos executar o co-
mando:
`$ git commit -m "Arquivo inicial de tarefas"`

Para verificar o histórico das alterações gravadas no repositório, podemos
executar o comando git log :
`$ git log`

## Compartilhando seu código através do GitHub

Acesse o site do [Githuv](https://github.com/), realize seu cadastro e logo depois crie seu repositório.

### Apontando seu projeto para o GitHub

Em um terminal, certifique-se de estar no diretório que inicializou seu git:

`$ cd ~/repo`

Então, execute o comando git remote , conforme o que segue:

`$ git remote add origin https://github.com/fulanodasilva/citacoes.git`

Com o comando anterior, apontamos o nome origin para o repositório lá do GitHub.

### Enviando as alterações para o GitHub
Com o repositório remoto configurado, podemos enviar nossas mudanças para o GitHub e, por consequência, para todo o mundo. Para isso, basta executar o comando git push , da seguinte forma:
`$ git push origin master`

Com o comando anterior, enviamos as alterações para o repositório remoto configurado com o nome origin.

### Obtendo projeto do GitHub

Para obter o código do projeto lá do GitHub, execute o comando git
clone conforme o seguinte:
`$ git clone https://github.com/fulanodasilva/citacoes.git`

Podemos rastrear todos esses arquivos de uma vez só com o comando:
`$ git add .`

## A área de stage

Quando informamos para o Git que queremos rastrear um arquivo, executando git add pela primeira vez, o Git coloca esse arquivo em uma área especial do repositório, chamada de stage. Uma vez que um arquivo está na área de stage, todas as mudanças nesse arquivo passam a ser examinadas.

## Ignorando arquivos

Para ignorar arquivos na hora de fazer seu commit basta criar um arquivo chamado `.gitignore` e colocar dentro dele os arquivos ou pastas a serem ignorados.

Acesse (https://github.com/github/gitignore) para ver exemplos de arquivos .gitignore

## Gravando arquivos no repositório

Para gravar esses arquivos e alterações definitivamente no repositório, de-
vemos utilizar o comando git commit :

`$ git commit -m "Commit inicial"`

É possível rastrear as mudanças e comitá-las de uma vez com a opção -a :

`$ git commit -a -m "Inserindo titulo e diminuindo tamanho da pagina"`

A opção -a do comando git commit já efetua o rastreamento das mudanças, adicionando-as à área de stage. Poderíamos juntar as opções -a e -m utilizando -am da seguinte maneira: git commit -am "Inserindo titulo..."

## Verificando o histórico do seu repositório

Para verificar o histórico das mudanças gravadas no repositório, ou seja, os commits efetuados, devemos utilizar o comando:
`$ git log`

Se quisermos mostrar apenas os dois últimos commits devemos utilizar a opção -n :
`$ git log -n 2`

Se quisermos um resumo bem conciso dos commits do nosso projeto, podemos utilizar a opção --oneline :
`$ git log --oneline`

Podemos mostrar um resumo dos arquivos alterados, com o número de linhas adicionadas e removidas, através da opção --stat .
`$ git log --stat`

Podemos também combinar as várias opções do comando git log . Por exemplo, para mostrar um resumo das alterações dos últimos dois commits:
`$ git log -n 2 --oneline --stat`

### Verificando mudanças ainda não rastreadas
Se quisermos revisar a modificação efetuada, verificando as diferenças entre o arquivo alterado e o que foi comitado anteriormente, podemos usar o 
comando:
`$ git diff`

Por exemplo, para verificarmos as mudanças apenas no arquivo index.html , faríamos: `git diff index.html` .

### Verificando mudanças rastreadas

É possível mostrar as diferenças entre os arquivos na área de stage e a última versão que foi comitada utilizando a opção --staged :
`$ git diff --staged`

## Desfazendo mudanças

### Desfazendo mudanças não rastreadas

O comando git checkout desfaz as alterações ainda não rastreadas, ou seja, que ainda não estão na área de stage, voltando ao conteúdo anterior do arquivo.
`$ git checkout -- index.html`

E se apagarmos algum arquivo sem querer? Medo! Desespero!

Podemos utilizar o comando git checkout para recuperar arquivos
removidos acidentalmente:
`$ git checkout -- index.html`

Pronto! Arquivo recuperado!

### Desfazendo mudanças já rastreadas

Se quisermos apenas remover da área de stage a mudança efetuada no arquivo index.html , preservando o arquivo modificado, devemos executar:

`$ git reset -- index.html`

Quando utilizado dessa maneira, apenas informando um arquivo que tem mudanças na área de stage, o comando git reset retira o arquivo da stage mas preserva tudo o que foi modificado nesse arquivo.

Se invocarmos o comando git reset sem nenhum parâmetro, serão retirados todos os arquivos da área de stage. As alterações efetuadas nesses arquivos serão preservadas.

No caso de querermos descartar todas as mudanças nos arquivos ao invocarmos git reset , devemos utilizar a opção --hard . Há um detalhe importante: a opção --hard retira todos os arquivos da área de stage e desfaz todas as alterações nesses arquivos. No fim das contas, o repositório fica exatamente no estado que estava no último commit. Para testarmos, vamos colocar as mudanças no arquivo index.html novamente na área de stage executando git add index.html . Então, vamos executar o comando:
`$ git reset --hard`

### Desfazendo mudanças já comitadas

Se quisermos voltar atrás, desfazendo as alterações no repositório, podemos utilizar o comando:
`$ git revert --no-edit 6111116` 
Nesse comando, o código 6111116 representa o último commit efetuado. Se omitirmos a opção --no-edit , será aberto um editor de texto para editarmos a mensagem do 
novo commit.

## Repositório remoto
### Adicionando repositorio remoto

`$ git remote add {servidor}`

### Alterando e removendo os repositórios remotos

É possível alterar o name de um repositório remoto utilizando o comando git remote rename:

`$ git remote rename servidor outronome`

A mudança é feita com o comando, o git remote set-url, passando como parâmetro o name do repositório remoto e a nova url:

`$ git remote set-url servidor`

## Enviando os commits do projeto para o GitHub

O envio dos commits é feito utilizando o comando git push:
`$ git push origin master`

## Organizando o trabalho com branches

### Trabalhando em paralelo com branches

A maioria dos sistemas de controle de versão permite trabalho em paralelo através de branches. Uma branch é uma linha independente de desenvolvimento em que p

### A branch master

O Git possui por padrão uma branch principal chamada master.

Se quisermos listar as branches existentes no nosso repositório com os commits associados, poderíamos utilizar a opção -v do comando git branch:
`$ git branch -v`

Juntando as opções, podemos executar git log --oneline
--decorate --parents para exibir o histórico resumido do nosso
repositório com o commit para o qual a master está apontado e os commits pai de cada commit.Teríamos uma saída parecida com:
`git log --oneline --decorate --parents`

### Criando uma branch

Para criarmos uma branch chamada design para trabalharmos na melhoria do design basta executarmos:

`$ git branch design`

Para trocarmos para a branch recentemente criada, devemos executar:
`$ git checkout design`

Criando e já trocando para uma nova branch uma só vez. Podemos fazer isso passando a opção -b para o comando git
checkout:

`$ git checkout -b loja`

Para deletar uma branch, devemos utilizar a opção -d do comando git branch:
`$ git branch -d loja`

Não é possível deletar com a opção -d uma branch que possui commits ainda não aplicados em outras branches.
Para removermos a branch loja se tivermos feito algum commit, devemos utilizar a opção -D:
`$ git branch -D loja`

### Mesclando alterações

Verificando branches ainda não mescladas.Considerando que estamos na branch master, podemos verificar as
branches ainda não mescladas com a opção --no-merged do comando git
branch:
`$ git branch --no-merged`

Teríamos a seguinte saída da branch não mesclada:
`$ design`

Isso indica que há mudanças ainda não mescladas na branch  design. O comando git branch também tem a opção --merged. Se executássemos git branch --merged, teríamos:
`* master`

Mesclando alterações com merge:
Para juntarmos todas as alterações que fizemos na branch design com as da branch master, mesclando as duas, podemos utilizar o comando:

`$ git merge design -m "Mesclando com a branch design"`
