# Clean Code

Notas do livro Clean code do Robert C. Martin

"Mais tarde é igual a nunca" - Lei de Leblanc ( Arrume seu código agora, não depois).

## Código limpo (Cap-1)

### O que é um código limpo?

De acordo com Bfarne Stroustrup criador do C++:
"Gosto do meu código elegante e eficiente. A lógica deve ser direta para dificultar o encobrimento de bugs, as depêndencias mínimas para facilitar a manutenção, 'o t'ratamento de erro completo de acordo com uma estratégia clara e o desempenho oróximo do mais eficiente de modo a não incitar as pessoas a tornarem o código confuso com otimização sorrateiras. O código limpo faz apenas uma coisa"

"Deixe o acampamento mais limpo do que como você encontrou."
"Experimente e deixe este mundo um pouco melhor de como você o achou..."

## Nomes significativos (Cap-2)

### Use nomes que revelem seu propósito

O nome de uma váriavel, função pu classe deve responder a todas as grandes questões. Ele deve lhe dizer porque existe, p que faz e como é usado. Se um nome requer um comentário, então ele não revela seu propósito.

Exemplo de um nome obscuro:
`if (cell[STATUS_VALUE] == FLAGGED)`
Mudar para:
`if (cell.isFlagged())`

### Evite informações erradas

Os progamadores devem evitar passar dicas falsas que confundam o sentido do código. Devemos evitar palavras cujos significados podem desviar daquele que desejamos. Por exemplo, hp, aix e sco seriam nomes ruins para variáveis pois são os nomes de plataforma Unix ou variantes. Mesmo se estiver progamando uma hipotenusa e hp parecer uma boa abreviação, o nome pode ser mal interpretado.

Não se refira a um grupo de contas como accountList a menos que realmente seja uma List. A palavra list significa algo específico para progamadores. Se o que armazeda as contas não for uma List de verdade oderá confundir os outros. Portanto , accountGroup ou apenas accounts seria melhor.

Cuidado ao usar nomes muito parecidos

### Faça distinções significativas

    Por exemplo, a horrível pratica de criar uma variável klass só porque class já está sendo usada.

Na ausência de convenções concretas, a variável moneyAmount não é distinguida
de dinheiro, customerInfo é indistinguível de customer, accountData é indistinguível de
conta e theMessage é indistinguível da mensagem. Deve diferenciar nomes de formas
que o leitor aprecie as diferenças.

### Use nomes que possam ser pronunciados

Crie nomes pronunciáveis.
Se você não consegue pronunciá-lo,não será capaz de explicá-lo sem parecer bobo. É um fator importante, já que a programação é uma atividade social.

### Use nomes pesquisáveis

Nomes de uma letra e constantes numéricas têm um problema: não são fáceis de localizar no texto. MAX_CLASSES_PER_STUDENT pode ser detectado, mas o número 7 é mais difícil. As pesquisas podem retornar o dígito como parte de nomes de arquivos, outras definições de constantes
ou expressões onde ele é usado com outra finalidade. Muito pior se a constante for um número grande e alguém tiver

### Nomes de classe

Classes e objetos devem ter nomes ou frases de nomes como Customer, WikiPage, Account e AddressParser. Evite palavras como gerente, processador, dados ou informações em um nome de classe. O nome de uma classe não deve ser um verbo.

### Nomes de métodos

Os métodos devem ter nomes de verbos como postPayment, deletePage ou save. Métodos de acesso, métodos de modificação e predicados devem ser nomeados por seu valor e prefixados com get, set e estão de acordo com o padrão.
`string nome = funcionário.getName();`
`cliente.setName(“mike”); `
`if (salário.isPosted())`

### Adicionar contexto significativo

Alguns nomes têm significado próprio, mas a maioria não. Portanto, você deve incluí-los em um contexto, em classes nomeadas, funções e namespaces.
Imagine que você tenha as variáveis firstName, lastName, street, houseNumber, city, state e CEP. Se você combiná-los, é evidente que eles formam uma direção. Mas se a variável de estado for usada isoladamente em um método, você saberia que ela faz parte de um endereço?

## Funções

### Funções pequenas

A primeira regra prática para funções é que elas devem ser pequenas em tamanho. A segunda é que eles devem ser ainda menores. Máximo 20-30 linhas.

### Blocos e Identação

Isso implica que os blocos em if, else, while e declarações semelhantes devem ter uma linha de comprimento que é provavelmente uma chamada de função. Desta forma, não apenas o tamanho da função é reduzido, mas também o valor documental é adicionado, pois a função chamada do bloco pode ter um nome descritivo. Também implica que as funções não devem ser muito grandes para acomodar estruturas aninhadas. Portanto, o nível de indentação de uma função não deve ser maior que um ou dois.
Obviamente, desta forma as funções são mais fáceis de ler e entender.

### Faça apenas uma coisa

As funções devem fazer apenas uma coisa. Devem faze-la bem. Devem fazer apenas ela.

### Leia o código de cima para baixo: a regra descendente

O objetivo é que o código seja lido como um texto de cima para baixo.Queremos que depois de todas as funções aparecem as do próximo nível de abstração para podermos ler o programa, descendo um nível de abstração por vez enquanto lemos a lista de funções. Isso é o que chamo de regra descendente.

### Use nomes descritivos

"Sabemos que estamos trabalhando com código limpo quando cada rotina é mais ou menos o que esperávamos"
Um nome descritivo longo é muito melhor do que um nome curto, mas enigmático.

### Parâmetros de função

Quando menos parâmetros melhor.

### Verbos e palavras-chave

No caso de uma mônade, a função e o parâmetro devem formas um belo par verbo/substantivo. Por exemplo, `write(name)` é bastante claro.

### Sem efeitos colaterais

Os efeitos colaterais são mentiras. Sua função promete fazer uma coisa, mas também faz outras
coisas ocultas. Às vezes, ele faz alterações inesperadas nas variáveis de sua própria classe. Às vezes faz delas
as variáveis passadas à função ou a elementos globais do sistema. Em ambos os casos, é cometido um
truque que geralmente leva a estranhas combinações de tempo e dependências de ordem.

### Melhores exceções do que retornar códigos de erro

### Tratamento de erros é uma coisa só

As funções só precisam fazer uma coisa, e o processamento de erros é um exemplo. Portanto, uma função que processa erros não deve fazer mais nada. Isso implica (como no exemplo acima) que se uma função inclui a palavra-chave try, ela deve ser a primeira palavra-chave na função e não deve haver mais nada após os blocos catch/finally.

### Conclusão

Programadores experientes pensam em sistemas como histórias que contar, não como em programas para escrever. Eles usam os recursos da linguagem de programação selecionada para criar uma linguagem expressiva melhor e mais completa que possam usar para contar essa história. Parte dessa linguagem é a hierarquia de funções que descrevem as ações que podem ser executadas no sistema. Essas ações são criadas para usar a linguagem de
domínio específica que eles definem para contar sua pequena parte da história.

## Comentários (Cap-4)

O uso correto dos comentários nos permite compensar nossa incapacidade de nos expressarmos no código.
 Quando você tiver que escrever um comentário, pense se não há outra maneira de expressá-lo no código. Contanto que você se expresse no código, você deve se parabenizar. Sempre que escrever um comentário, você deve fazer uma cara de desaprovação e sentir sua incapacidade
de se expressar.

## Formatação (Cap-5)

### A metáfora do jornal

Pense em um artigo de jornal bem escrito. No topo aguarda uma manchete que indica sobre o que é a história e permite que você determine se deseja ou não lê-la. O primeiro parágrafo fornece uma sinopse da história, esconde os detalhes e mostra conceitos gerais. À medida que a leitura avança, os detalhes aumentam junto com todas as datas, nomes, citações e outros itens.

Um arquivo de código deve ser como um artigo de jornal. O nome deve ser simples, mas claro. Por si só, deveria ser suficiente para nos dizer se estamos ou não no módulo correto. Os elementos superiores do arquivo devem fornecer conceitos e algoritmos de nível superior. Os detalhes devem aumentar à medida que avançamos, até que no final encontramos as funções de nível inferior do arquivo.

### Funções dependentes

Se uma função chamar outra, elas devem estar próximas verticalmente e a função de chamada deve estar acima da chamada sempre que possível. Desta forma o programa roda normalmente.

### Formatação horizontal

Mantenha linhas curtas

## Objetos e Estrutura de dados (Cap-6)

- O código procedural (código que usa estruturas de dados) facilita a adição de novas funções sem alterar as estruturas de dados existentes. O código orientado para objetos, por sua vez, facilita a inclusão de novas classes sem alterar as funções existentes.

Assim como o inverso é verdade:

- código procedural dificulta a inclusão de novas estruturas de dados, pois todas as funções precisam ser alteradas. O código orientado a objetos dificulta a inclusão de novos recursos porque
todas as classes precisam ser alteradas.

Portanto, o que é difícil para a programação orientada a objetos é fácil para os procedural e vice-versa.

Em qualquer sistema complexo, haverá momentos em que desejaremos adicionar novos tipos
de dados em vez de novas funções. Nesses casos, objetos e programação orientada a objetos são os
mais apropriados. Por outro lado, às vezes teremos que adicionar novas funções em vez de tipos de
dados, para os quais é mais adequado usar código por procedimentos e estruturas de dados.

## Tratamendo de Erros (Cap-7)

### Use exceções em vez de códigos de retorno

### Usar exceções não verificadas

O preço das exceções verificadas é uma violação do princípio aberto/
fechado. Se você lançar uma exceção verificada de um método em seu código e a cláusula catch estiver três níveis abaixo dela, você deverá declarar essa exceção na assinatura de todos os métodos entre sua posição e catch. Isso significa que uma alteração em um nível inferior do software pode forçar alterações de assinatura em muitos níveis superiores. Os módulos alterados precisarão ser reconstruídos e implantados, mesmo que os elementos aos quais eles fazem referência não sejam alterados

### Forneça contexto ao lado das exceções

Redija mensagens de erro informativas e passe-as junto com suas exceções. Mencione a operação com falha e o tipo de falha. Se você mantiver logs em seu aplicativo, inclua informações suficientes para poder registrar o erro na cláusula catch.

### Não retorne Null

 Ao retornar nulo, basicamente criamos trabalho para nós mesmos e
problemas para os chamadores. Uma verificação ausente de nulo é suficiente para que o aplicativo perca o controle. Retornar uma lista vazia é melhor que voltar um `null`.
 
### Não passe Null

## Testes de unidade (Cap-9)

### As três leis do TDD

**Primeira Lei**: Você não deve criar código de produção até que tenha criado um teste de unidade com falha.
**Segunda Lei**: Você não deve criar mais de um teste de unidade que seja considerado uma falha, e falhar na compilação é considerado uma falha.
**Terceira Lei**: Você não deve criar mais código de produção do que o necessário para passar no teste de falha atual.

### Testes limpos

O que torna um teste limpo? Três elementos: legibilidade, legibilidade e legibilidade. A legibilidade é certamente mais importante em testes de unidade do que em código de produção. O que torna um teste legível? O mesmo do código: clareza, simplicidade e densidade de expressão. Em um teste, você deve dizer muito com o mínimo de expressões possível.

### F.I.R.S.T.

As provas limpas seguem outras cinco regras, cujas iniciais formam a sigla FIRST em inglês: Speed

**(Fast)**: As regras devem ser rápidas e correr rapidamente. Se isso eles fazem lentamente, você não os executará com frequência. Ao não fazer isso, você não detectará problemas com antecedência suficiente para corrigi-los. Você não se sentirá à vontade para limpar seu código, que eventualmente ficará corrompido.

**Independência (Independent)**: Os testes não devem depender uns dos outros. Um teste não
deve estabelecer condições para o próximo. Você deve ser capaz de executar cada teste independentemente
e na ordem que desejar. Se os testes dependem um do outro, o primeiro a falhar causará uma sucessão
de falhas, dificultará o diagnóstico e ocultará os efeitos posteriores.

**Repetição (Repeatable)**: Os testes devem ser repetíveis em qualquer ambiente. Você deve ser capaz de executá-los no ambiente de produção, no ambiente de qualidade e em seu
laptop a caminho de casa em um trem sem rede. Se você não conseguir repetir os testes em nenhum
ambiente, sempre terá uma desculpa para sua falha. Você também verá que não poderá executar os testes se o ambiente não estiver disponível.

**Validação automática (Self-Validating)**: Os testes devem ter um resultado booleano: ou são
bem-sucedidos ou são reprovados. Você não deveria ter que ler um grande arquivo de log para descobrir
se um teste foi bem-sucedido ou comparar manualmente dois arquivos de texto diferentes para fazer isso.
Se os testes não forem validados automaticamente, a falha pode ser subjetiva e a execução do teste pode exigir uma extensa avaliação manual.

**Pontualidade (Timely)**: As provas devem ser criadas no momento preciso: antes do código de produção que os faz bater. Se você criar os testes após o código de produção, pode ser difícil testá-lo. Você pode decidir qual parte do código de produção é muito difícil de testar. Não crie
código de produção que não possa ser testado.

## Classes (Cap-10)

## Sistemas (Cap-11)

### Separe a construção e o uso de um sistema

Os sistemas de software devem separar o processo de inicialização, no qual o Os objetos e dependências do aplicativo são anexados, a partir da lógica de execução que recebe o token na inicialização.

## Emergênca (Cap-12)

Um projeto é simples se seguir estas quatro
regras:
- Executar todos os testes.
- Não contém duplicatas.
- Expressa a intenção do programador.
- Minimize o número de classes e métodos.

Acima de tudo um projeto deve gerar um sistema que funcione como esperado. Diminua o aclopamento.

**Leve a sério o encapsulamento de dados; limite severamente o acesso a quaisquer dados que possam ser compartilhados.**

## Odosres e Heurísticas (Cap-17)

### Comentários

C1-Informação imprópria: Estes devem conter apenas dados técnicos sobre o código e o projeto
C2-Comentário obsoleto
C3-Comentário redundante
C4-Código comentado: é mais provável que eles mofem lá.

### Funções
F1-Parâmetros em excesso: As funções devem ter um pequeno número de argumentos. é melhor não tem, seguido por um, dois e três argumentos. Mais de três já é questionável e deve ser evitado.
F2-Parâmetros de saída: Os argumentos de saída são ilógicos. O leitor espera que os argumentos sejam entradas,
não saídas. Se sua função precisar alterar o estado de algo, faça-a alterar o estado do objeto no qual
é chamada.
F3-Parâmetros lógicos: Argumentos booleanos declaram abertamente que a função faz mais de um coisa. Eles são confusos e devem ser removidos.

### Geral

G10-Separação vertical: Variáveis e funções devem ser definidas perto de onde são usadas. As variáveis locais devem ser declaradas acima de seu primeiro uso e devem ter um pequeno escopo vertical. Eles não devem ser declarados a centenas de linhas de seu uso.

G13-Acoplamento artificial: Em geral, uma conexão artificial é aquela estabelecida entre dois módulos sem um propósito direto. É o resultado da inclusão de uma variável, constante ou função em um local temporariamente útil, mas inapropriado. É um sintoma de desatenção.

G16-Propósito obsocuro:  Expressões longas, notação
húngara e números mágicos distorcem a intenção do autor

G19- Nomes de funções devem dizer o que elas fazem.

G25-Substituir números mágicos por constantes nomeadas

G26-Seja preciso: Ao tomar uma decisão no código, você deve fazê-lo com precisão. Você precisa saber por que o adota e como lidará com as exceções.

G28-Encapsular condicionais

G29-Evite condicionais negativas

G30-As funções devem fazer apenas uma coisa

G33-Encapsular condições de limite:
```js
if (level + 1 < tags.length)
// Mudar para
if(nextLevel < tags.length) 
 ```
G35-Mantenha os dados configuráveis em níveis mais altos