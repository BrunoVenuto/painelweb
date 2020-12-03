import Cookies from 'js-cookie';
import qs from 'qs';

const BASEAPI = 'http://127.0.0.1:8000/api';//tentando para rotas web

const apiPost = async (endpoint, body) => {
    if(!body.token) {
        let token = Cookies.get('token');
        if(token) {
            body.token = token;
        }
    }
    const response = await fetch(BASEAPI+endpoint, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
    });
    const json = await response.json();
    
    if(json.notallowed) {
        window.location.href = "/";
        return;
    }
    return json;
}

const apiGet = async (endpoint, body = []) => {
    if(!body.token) {
        let token = Cookies.get('token');//if para verificar se tem token e adicionar em todas requisiçoes
        if(token) {
            body.token = token;
        }
    }
    const response = await fetch(`${BASEAPI+endpoint}?${qs.stringify(body)}`);
    const json = await response.json();
    
    if(json.notallowed) {
        window.location.href = "/";
        return;
    }
    return json;
}


const API = {
    //PRECISO LOGAR COMO BARBER // AINDA ESTOU LOGANDO COMO CLIENTE
    login:async (email, password) => {
        const json = await apiPost(
            '/auth/login',
            {email, password}
        );
        return json;
    },
    //AINDA ESTOU EM ROTAS DE CLIENTES
    //PRECISO AGORA CONSEGUIR CADASTRAR COMO BARBER
    register:async (name, email, password) => {
        const json = await apiPost(
            '/user',
            {name, email, password}
        );
        return json;
    }
    
};


export default ()=>API;