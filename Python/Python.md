# Python


- [Tuplas](#Tuplas)

## Coisas sobre Python
*Obs*: Tuplas, assim como Listas, armazenam tipos variados de dados.

*> Python é uma linguagem de programação de alto nível com suporte a múltiplos paradigmas de programação. É um projeto *open source* e desde seu surgimento, em 1991, vem se tornando uma das linguagens de programação interpretadas mais populares.*

*> Nos últimos anos Python desenvolveu uma comunidade ativa de processamento científico e análise de dados e vem se destacando como uma das linguagens mais relevantes quando o assunto é ciência de dados e machine learning, tanto no ambiente acadêmico como também no mercado.*

Carregando arquivos `.txt`.

```python
import numpy as np
km = np.loadtxt('carros-km.txt')
```

 **Divisão  `/`  e  `//` :**

A operação divisão  `10 / 3` retorna `3.333333333333...`.

A operação divisão `10 // 3` retorna `3`.

***Exponenciação `**`:***

`2**3` retorna  `8`

Resto da divisão `%` :

`10 % 3`  retorna `1`

No modo ***interativo***, o último resultado impresso é atribuído à variável  `_`

***Declaração múltipla:***

`ano_atual, ano_fabricacao, km_total = 2019, 2003, 44410.0`

Os tipos de dados especificam como números e caracteres serão armazenados e manipulados dentro de um programa. Os tipos de dados básicos do Python são:

- **Números:**

           - ***int*** - Inteiros

           - ***float*** - Ponto flutuante

- **Booleanos** - Assume os valores True ou False. Essencial quando começarmos a trabalhar com declarações condicionais
- **Strings** - Sequência de um ou mais caracteres que pode incluir letras, números e outros tipos de caracteres. Representa um texto.
- **None** - Representa a ausência de valor

Mostrando o tipo da variável  `type(carro)`

***Formatando saída do*** `print()`

Esta forma:

`print('Olá, {nome}! número {acessos}'.format(nome = 'Rodrigo', acessos = 32))`

E esta semelhando aos templetas string do javascript:

`nome = 'Rodrigo'`

`acessos = 32`

`print(f'Olá, {nome}! Este é seu acesso de número {acessos}')`

## Listas

Listas são sequências **mutáveis** que são utilizadas para armazenar coleções de itens, geralmente homogêneos. Podem ser construídas de várias formas:

- Utilizando um par de colchetes: [ ], [ 1 ]
- Utilizando um par de colchetes com itens separados por vírgulas: [ 1, 2, 3 ]

`Acessorios = ['Rodas de liga', 'Travas elétricas', 'Piloto automático', 'Bancos de couro', 'Ar condicionado', 'Sensor de estacionamento', 'Sensor crepuscular', 'Sensor de chuva']`

Listas de listas  `Carros = [Carro_1, Carro_2]`

Operação com listas:

`'Rodas de liga' in Acessorios`

`'Rodas de liga' not in Acessorios`

 Somar duas listas junta sues conteúdos em apenas uma: `lista1 + lista2`

Tamando da lista  `len(Acessorios)`

`Acessorios[-1]` retorna o último elemento da lista

`Acessorios[2:5]`  seleciona o intervalo de elementos

`Acessorios.sort()`  ordena a lista

`Acessorios.append('4 X 4')`  Adiciona ao final da lista

*`A.pop(i)`*  Remove e retorna o elemento de índice `i` da lista. Por **default** o método `pop()` remove e retorna o último elemento de uma lista.

*`A.copy()`*  Cria uma cópia da lista *`A`*.

`range(10)`  retorna  `range(10)`

`list(range(10))`  retorna  `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`

Exemplo código aninhado:

```python
for lista in dados:
	for item in lista:
		Acessorios.append(item)
```

## Tuplas

Tuplas são sequências **imutáveis** que são utilizadas para armazenar coleções de itens, geralmente **heterogêneos**. Podem ser construídas de várias formas:

**# 2.1 Criando tuplas**

 Podem ser construídas de várias formas:

- Utilizando um par de parênteses: ( )
- Utilizando uma vírgula à direita: x,
- Utilizando um par de parênteses com itens separados por vírgulas: ( x, y, z )
- Utilizando: tuple() ou tuple(iterador)

`nome_carros = tuple(['Jetta Variant', 'Passat', 'Crossfox', 'DS5'])` - Transformando listas em tuplas

## Dicionários

Listas são coleções sequenciais, isto é, os itens destas sequências estão ordenados e utilizam índices (números inteiros) para acessar os valores.

Os dicionários são coleções um pouco diferentes. São estruturas de dados que representam um tipo de mapeamento. Mapeamentos são coleções de associações entre pares de valores onde o primeiro elemento do par é conhecido como chave (**key**) e o segundo como valor (**value**).

`dicionario = {key_1: value_1, key_2: value_2, ..., key_n: value_n}`

[https://docs.python.org/3.6/library/stdtypes.html#typesmapping](https://docs.python.org/3.6/library/stdtypes.html#typesmapping)

`dados = dict(zip(carros, valores))` - Criando dicionários

### *dict[ key ]*

Retorna o valor correspondente à chave (**key**) no dicionário.

### *key in dict*

Retorna ****True**** se a chave (**key**) for encontrada no dicionário.

### *len(dict)*

Retorna o número de itens do dicionário.

### *dict[ key ] = value*

Inclui um item ao dicionário.

### *del dict[ key ]*

Remove o item de chave (**key**) do dicionário.

## Métodos de dicionários

### *dict.update()*

Atualiza o dicionário.

`dados.update({'Passat': 106161.94})` - Atualizando um item

`dados.update({'Passat': 106161.94, 'Fusca':150000})` - Atualizando um item e adicionando outro.

### *dict.copy()*

Cria uma cópia do dicionário.

`dadosCopy = dados.copy()`

### *dict.pop(key[, default ])*

Se a chave for encontrada no dicionário, o item é removido e seu valor é retornado. Caso contrário, o valor especificado como *default* é retornado. Se o valor *default* não for fornecido e a chave não for encontrada no dicionário um erro será gerado.

### *dict.clear()*

Remove todos os itens do dicionário.

## Iterando em dicionários

### *dict.keys()*

Retorna uma lista contendo as chaves (**keys**) do dicionário.

### *dict.values()*

Retorna uma lista com todos os valores (**values**) do dicionário.

### *dict.items()*

Retorna uma lista contendo uma tupla para cada par chave-valor (**key-value**) do dicionário.

