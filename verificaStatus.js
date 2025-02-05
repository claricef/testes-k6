// O objetivo desse teste é simular 10 usuários simultâneos que fazem requisições GET para um endpoint e
// verificam se o status da resposta é 200 (OK). Eles fazem isso por 30 segundos, fazendo uma requisição a 
// cada 1 segundo.

import http from 'k6/http';        // Importa o módulo HTTP do k6
import { check, sleep } from 'k6';  // Importa funções auxiliares 'check' e 'sleep'

export let options = {
  vus: 10, // Número de usuários virtuais (VUs) simultâneos
  duration: '30s', // Duração do teste (30 segundos)
};

export default function () {
  // Envia uma requisição HTTP GET para a URL especificada
  let res = http.get('https://test-api.k6.io');
  
  // Verifica se a resposta tem o status 200 (OK)
  check(res, {
    'status é 200': (r) => r.status === 200,
  });

  // Faz uma pausa de 1 segundo entre as requisições
  sleep(1);
}