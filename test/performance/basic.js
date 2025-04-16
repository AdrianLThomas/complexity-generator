import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.05'], // http errors should be less than 5%
  },
  stages: [
    { duration: '30s', target: 10 }, // warm-up
    { duration: '4m', target: 50 },  // test
    { duration: '1m', target: 0 },  // ramp down
  ]
};

export default function () {
  http.get('https://complexity-api.adrian-thomas.com?complexity=20&error-rate=0.01'); // errors 1% of the time

  sleep(0.1);
}