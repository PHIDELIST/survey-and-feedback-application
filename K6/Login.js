import http from 'k6/http';

export const options = {
  stages: [
    {duration: '5s', target: 5  },
    {duration: '10s', target: 10 },
    {duration: '5s', target: 5  },
  ]
};
export default function () {
  const url = 'http://localhost:8081/auth/login'
 const payload = JSON.stringify({
    
    Password: 'Phidel#7',
});
const params = {
    headers: {
        'Content-Type': 'application/json',
},
  };
  http.post(url, payload, params);
}