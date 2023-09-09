import http from 'k6/http';
import { check,sleep } from 'k6';
export const options = {
  stages: [
    {duration: '5s', target: 20  },
    {duration: '50s', target: 10 },
    {duration: '20s', target: 0  },
  ]
};
export default function () {
  const url = 'http://54.167.161.145:8081/auth/login'
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