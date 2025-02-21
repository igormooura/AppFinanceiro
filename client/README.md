# My currency - frontend

Um dashboard financeiro completo com autenticação de usuário, notícias, gráficos de câmbio e calculadora de conversão de moedas.

## Funcionalidades Principais

- **Registro/Autenticação de Usuário**
  - Formulário de registro com validação
  - Login com redirecionamento seguro
  - Armazenamento de token JWT

- **Perfil do Usuário**
  - Edição de informações pessoais
  - Formatação automática de CPF e telefone
  - Upload de foto de perfil

- **Feed de Notícias**
  - Listagem de notícias financeiras
  - Filtragem por categoria (Política, Economia, etc.)
  - Paginação de resultados

- **Gráficos de Câmbio**
  - Comparação de criptomoedas e moedas tradicionais
  - Seleção de período (1D, 7D, 30D, etc.)
  - Visualização de variação percentual

- **Calculadora Financeira**
  - Conversão de moedas em tempo real
  - Histórico de conversões
  - Suporte para múltiplas moedas (USD, EUR, BRL, etc.)

## Tecnologias Utilizadas

- **Frontend**
  - React.js
  - Tailwind CSS
  - Chart.js (Gráficos)
  - Axios (Requisições HTTP)
  - React Router (Navegação)

- **APIs Integradas**
  - CoinGecko API (Dados de criptomoedas)
  - ExchangeRate-API (Conversão de moedas)
  - Backend Customizado (Autenticação/Perfil)

## Instalação e Execução

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/financial-dashboard.git
```
2. Instale as dependências:
```bash
npm install
```
3. Configure as variáveis de ambiente (.env):
```bash
REACT_APP_API_LINK=http://localhost:5000
```
4. Inicie o projeto
```bash
npm start
```
