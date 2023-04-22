Pandas é uma ferramenta de manipulação de dados de alto nível, construída com base no pacote Numpy. O pacote pandas possui estruturas de dados bastante interessantes para manipulação de dados e por isso é muito utilizado por cientistas de dados.

### [Documentação](https://pandas.pydata.org/pandas-docs/version/0.25/)

## **Estruturas de Dados**

### **Series**

Series são arrays unidimensionais rotulados capazes de armazenar qualquer tipo de dado. Os rótulos das linhas são chamados de ****index****. A forma básica de criação de uma Series é a seguinte:

`s = pd.Series(dados, index = index)`

O argumento ***dados*** pode ser um dicionário, uma lista, um array Numpy ou uma constante.

***Criando uma Series a partir de uma lista:***

```python
import pandas as pd

carros = ['Jetta', 'Passet', 'Crossox']
carros # Retorno => carros = ['Jetta', 'Passet', 'Crossox']
pd.Series(carros)
# Retorno:
# 0      Jetta
# 1     Passet
# 2    Crossox
# dtype: object
```

### **DataFrames**

DataFrame é uma estrutura de dados tabular bidimensional com rótulos nas linha e colunas. Como a Series, os DataFrames são capazes de armazenar qualquer tipo de dados.

`df = pd.DataFrame(dados, index = index, columns = columns)`

O argumento ***dados*** pode ser um dicionário, uma lista, um array Numpy, uma Series e outro DataFrame.

***Criando um DataFrame a partir de uma lista de dicionários:***

```python
import pandas as pd

dados = [
    {'Nome': 'Jetta Variant', 'Motor': 'Motor 4.0 Turbo', 'Ano': 2003, 'Quilometragem': 44410.0, 'Zero_km': False, 'Valor': 88078.64},
    {'Nome': 'Passat', 'Motor': 'Motor Diesel', 'Ano': 1991, 'Quilometragem': 5712.0, 'Zero_km': False, 'Valor': 106161.94},
    {'Nome': 'Crossfox', 'Motor': 'Motor Diesel V8', 'Ano': 1990, 'Quilometragem': 37123.0, 'Zero_km': False, 'Valor': 72832.16}
]

dataset = pd.DataFrame(dados)
dataset
#Retorna:
#  Nome	Motor	Ano	Quilometragem	Zero_km	Valor
#	 0	Jetta Variant	Motor 4.0 Turbo	2003	44410.0	False	88078.64
#  1	Passat	Motor Diesel	1991	5712.0	False	106161.94
#  2	Crossfox	Motor Diesel V8	1990	37123.0	False	72832.16
```