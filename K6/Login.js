import http from 'k6/http';

export const options = {
  stages: [
    {duration: '5s', target: 20  },
    {duration: '10s', target: 10 },
    {duration: '5s', target: 0  },
  ]
};
export default function () {
  const url = 'http://localhost:8081/auth/login'
 const payload = JSON.stringify({
    email: 'phidel@gmail.com',
    password: 'Phidel#7',
});
const params = {
    headers: {
        'Content-Type': 'application/json',
},
  };
  http.post(url, payload, params);
}