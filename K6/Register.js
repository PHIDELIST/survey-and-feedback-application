import http from 'k6/http';
export const options = {
    stages: [
        {duration: '5s', target: 10}
    ]
};

export default function () {
    const url = 'http://localhost:8081/auth/register'
    const payload = JSON.stringify({
        AdminName:'phidel',
        Email: 'phhe@gmail.com',
        Password : 'AJAJsjs@kd46',
    });
    const params = {
        headers : {
            'Content-Type' : 'application/json',
        },
    };
    http.post(url,payload,params)
}