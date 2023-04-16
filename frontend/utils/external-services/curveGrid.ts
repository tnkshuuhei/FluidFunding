const axios = require('axios');

let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://corsproxy.io/?https://s233z7wptngdtmmcgkxqchn2eu.multibaas.com/api/v0/events?contract_label=grant&contract_address=grant3&event_signature=RegisteredProject(address,string,string,address)',
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1MDIwMzE4NC04YjBlLTQ4ZDYtOWUyMi0yOTk5ZTdlZjA4ZGMiLCJpYXQiOjE2ODE1Nzk2MjEsInN1YiI6IjEifQ.duVDg08jCDadJLnvTg4b473ZhwkuQcOp6DO21RY91PU'
    }
};

export const getProjects = () => {
    return axios.request(config)
        .then((response: any) => {
            console.log(JSON.stringify(response.data));
            return response;
        })
        .catch((error: Error) => {
            console.log(error);
        });
};