const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('');
});


const graficoData = {
  "BTC": { value: 34000, change: 2.5 },
  "ETH": { value: 2100, change: 1.8 },
  "XRP": { value: 0.5, change: -0.5 },
  "LTC": { value: 160, change: 0.9 },
};

const noticias = [
  { id: 1, title: 'Bitcoin atinge novos recordes', date: '2024-11-25' },
  { id: 2, title: 'Ethereum se prepara para grande atualização', date: '2024-11-24' },
];

const sobreNos = {
  Criadores: 'Igor Moura, Ciro Moraes, Erick Saraiva',
  descricao: 'API para consultar informações sobre criptomoedas, gráficos e notícias.',
  anoCriacao: 2024,
};

// Rota para obter gráfico de uma moeda
app.get('/grafico/:moeda', (req, res) => {
  const moeda = req.params.moeda.toUpperCase();
  
  if (graficoData[moeda]) {
    res.json(graficoData[moeda]);
  } else {
    res.status(400).json({ error: 'Moeda não encontrada' });
  }
});

// Rota para obter notícias
app.get('/noticias', (req, res) => {
  res.json(noticias);
});

app.get('/noticias/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const noticia = noticias.find(n => n.id === id);

  if (noticia) {
    res.json(noticia);
  } else {
    res.status(404).json({ mensagem: 'Notícia não encontrada' });
  }
});

// Rota do Sobre Nós
app.get('/sobrenos', (req, res) => {
  res.json(sobreNos);
});

// Rota de calculadora
app.post('/calculadora', (req, res) => {
  const { valor, moedaOrigem, moedaDestino } = req.body;

  if (valor === undefined || moedaOrigem != Number|| !moedaDestino != Number) {
    return res.status(400).json({ error: 'Parâmetros inválidos. Informe valor, moedaOrigem e moedaDestino.' });
  }

  const taxasConversao = {
    'EUR': { 'BRL': 5.40 },  
    'USD': { 'BRL': 5.00 },
    'BRL': { 'EUR': 0.18, 'USD': 0.20 }
  };

  if (taxasConversao[moedaOrigem] && taxasConversao[moedaOrigem][moedaDestino]) {
    const taxa = taxasConversao[moedaOrigem][moedaDestino];
    const resultado = valor * taxa;
    res.json({ resultado: `${valor} ${moedaOrigem} = ${resultado} ${moedaDestino}` });
  } else {
    res.status(400).json({ error: 'Conversão não suportada entre essas moedas' });
  }
});

app.listen(3000, () => console.log('Server iniciado na porta 3000'));
