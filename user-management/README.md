
# Desafio tecnico First Decisioin

Sistema Full Stack de gerenciamento de usuários desenvolvido com as melhores práticas de mercado, utilizando Java 21 e Spring Boot 3.

## Funcionalidades

* CRUD de Usuários: Cadastro, listagem e exclusão.

* Validações Inteligentes: E-mail único e confirmação de senha na camada de serviço.

* Respostas Padronizadas: API retorna mensagens de sucesso amigáveis para o Front-end.

* Documentação Automática: Swagger UI configurado para testes rápidos.

## Tecnologias

* Back-end: Java 21, Spring Boot 3, Spring Data JPA.

* Banco de Dados: PostgreSQL 16.

* Infraestrutura: Docker & Docker Compose.

Testes: JUnit 5 e Mockito.

## Como Executar

A aplicação está totalmente containerizada. Basta ter o Docker instalado:

```bash
  docker compose up --build
```
## Acessar a Documentação (Swagger):
http://localhost:8080/swagger-ui/index.html