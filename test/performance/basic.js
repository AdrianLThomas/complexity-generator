import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '5m',
  thresholds: {
    http_req_failed: ['rate<0.05'], // http errors should be less than 5%
  },
};

export default function () {
  http.get(`${__ENV.ENDPOINT}?complexity=20&error-rate=${parseFloat(__ENV.ERROR_RATE)}`); // errors 1% of the time

  sleep(0.1);
}