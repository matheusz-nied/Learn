# Numpy Básico

Numpy é a abreviação de Numerical Python e é um dos pacotes mais importantes para processamento numérico em Python. Numpy oferece a base para a maioria dos pacotes de aplicações científicas que utilizem dados numéricos em Python (estruturas de dados e algoritmos). Pode-se destacar os seguintes recursos que o pacote Numpy contém:

- Um poderoso objeto array multidimensional;
- Funções matemáticas sofisticadas para operações com arrays sem a necessidade de utilização de laços *for**;
- Recursos de algebra linear e geração de números aleatórios

Além de seus óbvios usos científicos, o pacote NumPy também é muito utilizado em análise de dados como um eficiente contêiner multidimensional de dados genéricos para transporte entre diversos algoritmos e bibliotecas em Python.

- **Versão:** 1.16.5
- **Instalação:**** https://scipy.org/install.html
- **Documentação:**** https://numpy.org/doc/1.16/

### Pacotes

Existem diversos pacotes Python disponíveis para download na internet. Cada pacote tem como objetivo a solução de determinado tipo de problema e para isso são desenvolvidos novos tipos, funções e métodos.

Alguns pacotes são bastante utilizados em um contexto de ciência de dados como por exemplo:

- Numpy
- Pandas
- Scikit-learn
- Matplotlib

Alguns pacotes não são distribuídos com a instalação default do Python. Neste caso devemos instalar os pacotes que necessitamos em nosso sistema para podermos utilizar suas funcionalidades.

## Criando listas Numpy

```python
import numpy as np

km = np.array([1000, 2300, 4987, 1500])
type(km)
#retorna numpy.ndarray
```

**A partir de dados externos:**

`km = np.loadtxt(fname = 'carros-km.txt', dtype = int)`

**Arrays com mais dimensões:**

```python
dados = [ 
    ['Rodas de liga', 'Travas elétricas', 'Piloto automático', 'Bancos de couro', 'Ar condicionado', 'Sensor de estacionamento', 'Sensor crepuscular', 'Sensor de chuva'],
    ['Central multimídia', 'Teto panorâmico', 'Freios ABS', '4 X 4', 'Painel digital', 'Piloto automático', 'Bancos de couro', 'Câmera de estacionamento'],
    ['Piloto automático', 'Controle de estabilidade', 'Sensor crepuscular', 'Freios ABS', 'Câmbio automático', 'Bancos de couro', 'Central multimídia', 'Vidros elétricos']
]
dados
```

## Observação: O Numpy possibilita várias operações entre Arrays. Pesquisar mais!

---

### Atributos

*`ndarray.shap`*  Retorna uma tupla com as dimensões do array.

*`ndarray.ndi`*  Retorna o número de dimensões do array.

*`ndarray.size`*  Retorna o número de elementos do array.

*`ndarray.dtype`*  Retorna o tipo de dados dos elementos do array.

*`ndarray.T`*  Retorna o array transposto, isto é, converte linhas em colunas e vice versa.

---

### Métodos

*`ndarray.tolist()`*  Retorna o array como uma lista Python.

*`ndarray.reshape(shape[, order])`*  Retorna um array que contém os mesmos dados com uma nova forma.

*`ndarray.resize(new_shape[, refcheck])`*  Altera a forma e o tamanho do array.

---

### Estatísticas com arrays Numpy

*`np.mean()`*  Retorna a média dos elementos do array ao longo do eixo especificado.

*`np.std()`*  Retorna o desvio padrão dos elementos do array ao longo do eixo especificado.

*`ndarray.sum()`*  Retorna a soma dos elementos do array ao longo do eixo especificado.

*`np.sum()`*  Retorna a soma dos elementos do array ao longo do eixo especificado.