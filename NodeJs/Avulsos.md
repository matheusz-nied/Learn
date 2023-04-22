# Dúvidas variadas de NodeJs

## Qual a diferença entre til e circunflexo no packages.json?

Abrimos o packages.json e rapidamente entendedemos que as dependencies são os pacotes que sua aplicação usa, mas oque são os simbolos que os precedem?

- O til(~) garante que o pacote seja sempre carregado  respeitando o número do meio da versão. Ex: ˜1.2.3 pega o pacote mais recente da versão 1.2.x, mas não vai atualizar para 1.3. Geralmente garante que correções de bugs sejam atualizados no seu pacote.

- O circunflexo(^) garante que o pacote seja sempre carregado respeitando o primeiro número da versão. Ex: ˆ1.2.3 pega o pacote mais recente da versão 1.x, mas não vai atualizar para 2.0. Garante que bugs e novas funcionalidades do seu pacote sejam atualizados, mas não novas versões “major” dele.

Outros símbolos incluem:

- >, >=, <, <=1.0: a versão deve ser superior, superior ou igual, inferior, inferior ou igual à 1.0, respectivamente.
- 1.2.x: equivalente a ˜1.2.0
- *: qualquer versão do pacote
- latest: a versão mais recente do pacote

Dica: Quando se quer atualizar todos pacotes é só colocar * na versão de todos e rodar o comando `npm update –save` sobre a pasta do projeto.