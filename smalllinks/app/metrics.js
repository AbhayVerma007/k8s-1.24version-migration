const client = require('prom-client');

client.collectDefaultMetrics();

const httpRequestCount = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1] 
});

const redisHits = new client.Counter({
  name: 'redis_hits_total',
  help: 'Total number of Redis cache hits'
});

const redisMisses = new client.Counter({
  name: 'redis_misses_total',
  help: 'Total number of Redis cache misses'
});

module.exports = {
  client,
  httpRequestCount,
  httpRequestDuration,
  redisHits,
  redisMisses
};