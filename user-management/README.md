# Desafio Técnico - First Decision

Sistema Full Stack de gerenciamento de usuários desenvolvido com as melhores práticas de mercado, utilizando Java 21 e Spring Boot 3.

## Funcionalidades

* **CRUD de Usuários:** Cadastro, listagem e exclusão.
* **Validações Inteligentes:** E-mail único e confirmação de senha na camada de serviço.
* **Respostas Padronizadas:** API retorna mensagens de sucesso amigáveis para o Front-end.
* **Documentação Automática:** Swagger UI configurado para testes rápidos.

## Tecnologias

* **Back-end:** Java 21, Spring Boot 3, Spring Data JPA.
* **Banco de Dados:** PostgreSQL 16.
* **Infraestrutura:** Docker & Docker Compose.
* **Testes:** JUnit 5 e Mockito.
* **CI/CD:** GitHub Actions.

## Como Executar

A aplicação está totalmente containerizada. Na raiz do projeto, basta ter o Docker instalado e rodar:

```bash
docker compose up --build -d