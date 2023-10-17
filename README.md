## O que é projeto Store Manager?
É um projeto de `Backend` usando o framework `Express.js` com o `Node.js`.

Desenvolvi em `Javascript` uma API RESTfull utilizando arquitetura de camadas, Model Service e Controller (MSC), com cobertura de testes. O papel dessa API é simular um sistema de gerenciamento de vendas onde é possível criar, visualizar, deletar e atualizar produtos e vendas. E foi usando o `MySQL` para gestão dos dados.

## Diagrama de Entidade Relacionamento
![DER](https://1drv.ms/i/s!Aml9VnXbwhlmhbgxvgO6ngt5oXzmfA?e=8Kj4IQ)



## Quais desafios que eu colaborei?
1. Listar os produtos: `GET /products e /products/:id`
2. Listar as vendas: `GET /sales e /sales/:id`
3. Cadastrar produtos: `POST /products`
4. Implementei um middleware para validar o cadastro de produtos
5. Cadastrar vendas: `POST /sales`
6. Implementei um middleware para validar o cadastro de vendas
7. Atualizar um produto: `PUT /products/:id`
8. Deletar um produto: `DELETE /products/:id`
9. Deletar uma venda: `DELETE /sales/:id`
10. Atualizar um produto em uma venda: `PUT /sales/:saleId/products/:productId/quantity`
11. Pequisar produtos: `GET /products/search` com parametro query q = nome
## Como iniciar?
1. Clonando o projeto `git clone https://github.com/livio-lopes/store-manager.git`
2. Acessando diretório `cd store-manager`
3. Instalando dependencias `npm install`
4. Subindo docker compose `docker-compose up -d`
5. É possível ver os logs da aplicação com `docker logs -n 10 -f store_manager`
