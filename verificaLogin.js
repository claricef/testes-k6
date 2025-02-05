import http from 'k6/http';
import { check, sleep } from 'k6';

// URL do endpoint de login da API pública
const url = 'https://reqres.in/api/login';

// Dados de login válidos
const payload = JSON.stringify({
  email: 'eve.holt@reqres.in',
  password: 'cityslicka'
});

// Cabeçalhos da requisição
const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function () {
  // Enviar a requisição POST para o endpoint de login
  const res = http.post(url, payload, params);

  // Verificar se o status da resposta é 200 e se a resposta contém um token
  check(res, {
    'status é 200': (r) => r.status === 200,
    'token presente': (r) => r.body.includes('token'),
  });

  // Aguardar 1 segundo entre as requisições
  sleep(1);
}
