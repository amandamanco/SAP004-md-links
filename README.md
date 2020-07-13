# Markdown Links

### Introdução
Essa biblioteca permite a leitura diretórios e arquivos do tipo .md, retornando links encontrados nesses mesmos arquivos.


### Instalação
Para instalar a biblioteca, basta utilizar:

```sh
npm install amandamanco/SAP004-md-links 
```


### Instruções de Uso
Para a execução da biblioteca, utilize a seguinte linha de comando, bem como os exemplos de pesquisa de arquivo e diretório, respectivamente:

```sh
$ md-links ./some/example.md
$ md-links ./example
```

### Retorno da Pesquisa
O retorno dessa pesquisa permite a visualização de:

* `file`: A rota do arquivo onde foi encontrado o link;
* `text`: O texto que é apresentrado dentro do link;
* `href`: Trás a URL encontrada.

### Exemplo de Uso

Executando os comandos acima, é possível verificar o seguinte resultado por pesquisa de arquivo .md:

```sh
$ md-links ./example/google.md
File: ./example/google.md | Text: Google | Href: https://google.com/
```

Em pesquisa por diretório, este é o resultado:

```sh
$ md-links ./example
File: ./example/google.md | Text: Google | Href: https://google.com/
```