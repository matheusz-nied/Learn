## Módulo Fs

Quando estamos desenvolvendo códigos para produção, sempre devemos usar uma API assíncrona, pois ela não bloqueia o *Event Loop* obtendo uma maior perfomance

## Utilizando Streams

Fazendo a cópia de arquivo utilizando streams:

```javascript
const fs = require('fs')  
const readableStream = fs.createReadStream('original.txt')  
var writableStream = fs.createWriteStream('copy.txt')

readableStream.pipe(writableStream)
```
A streams nos fornece uma vantagem de podermos alterar estes dados enquanto estão sendo copiados:

```javascript
const fs = require('fs')  
const zlib = require('zlib')

fs.createReadStream('original.txt.gz')  
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('original.txt'))
```