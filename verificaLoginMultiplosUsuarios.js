// O objetivo deste teste é verificar:
// Como a API responde quando vários usuários tentam fazer login ao mesmo tempo.
// Se há falhas ao autenticar usuários.
// O tempo médio de resposta para múltiplas requisições simultâneas.


import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

// Lista de usuários simulados
const users = [
  { email: 'eve.holt@reqres.in', password: 'cityslicka' },
  { email: 'john.doe@example.com', password: 'password123' },
  { email: 'jane.doe@example.com', password: 'securePass!' },
  { email: 'peter.parker@example.com', password: 'spider123' }
];

export const options = {
  vus: 5, // Simula 5 usuários concorrentes
  duration: '10s', // Executa o teste por 10 segundos
};

export default function () {
  // Escolhe um usuário aleatório da lista
  const user = randomItem(users);

  const url = 'https://reqres.in/api/login';
  const payload = JSON.stringify(user);

  const params = {
    headers: { 'Content-Type': 'application/json' },
  };

  const res = http.post(url, payload, params);

  // Verifica se a resposta está correta
  check(res, {
    'status é 200': (r) => r.status === 200,
    'token presente': (r) => r.body.includes('token'),
  });

  sleep(1); // Pausa de 1s entre requisições
}
