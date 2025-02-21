# Backend do Mycurrency

API backend para gestão de dados financeiros, autenticação de usuários e integração com serviços externos.

## Tecnologias Principais

- **Node.js** (Ambiente de execução)
- **Express.js** (Framework web)
- **MongoDB** (Banco de dados)
- **Mongoose** (ORM para MongoDB)
- **JWT** (Autenticação por token)
- **Bcrypt** (Criptografia de senhas)
- **Axios** (Requisições HTTP)

## Funcionalidades Principais

### 1. Autenticação e Usuários
- Registro de novos usuários com validação
- Login com JWT
- Redefinição de senha
- CRUD completo de perfis de usuário

### 2. Conversão Monetária
- Conversão em tempo real usando ExchangeRate-API
- Histórico de conversões por usuário
- Armazenamento de taxas de câmbio

### 3. Gestão de Gráficos
- Criação/remoção de gráficos de câmbio
- Integração com CoinGecko API
- Limite de 3 gráficos por usuário

### 4. Feed de Notícias
- CRUD de notícias financeiras
- Paginação e filtragem por tags
- Busca por palavras-chave
