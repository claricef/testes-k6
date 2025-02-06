// Com este teste conseguimos simular o cenário de um ramp-up, com o primeiro stage. O teste vai executar 
// durante 10 segundos aumentando gradualmente o número de usuários até atingir 100. Depois vai ficar executando
// acessos com estes 100 usuários por 30 segundos e, finalmente, vai levar mais 10 segundos para diminuir 
// gradualmente o número, até zerar.

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        {
            duration: '10s',
            target: 100
        },
        {
            duration: '30s',
            target: 100
        },
        {
            duration: '10s',
            target: 0
        }
    ]
}

export default function(){
    http.get('https://test-api.k6.io');
    sleep(1);
}