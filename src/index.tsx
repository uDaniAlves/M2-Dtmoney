import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model, // Cria 
  },

  seeds(server) {
    server.db.loadData ({
      transactions: [
        {
          id: 1,
          title: 'Freelancer de Website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-01-12 09:00:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-01-15 08:00:00')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api'; //todas as chamadas À API estao a partir de 'api'
    this.get('/transactions', () => {
      return this.schema.all('transaction')
      
    }) // quando houver um get para a rota transactions

    this.post('/transactions', (schema, request)=> {
      const data = JSON.parse(request.requestBody)
      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

