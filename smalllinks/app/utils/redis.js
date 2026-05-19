module.exports = (redisClient) => {
  const { promisify } = require('util');
  const metrics = require('../metrics'); // ADDED: Import metrics

  // ADDED: Save the original binding so we can wrap it
  const originalGetAsync = promisify(redisClient.get).bind(redisClient);

  // ADDED: Wrapper function to track hits and misses
  const getAsyncWithMetrics = async (key) => {
    const result = await originalGetAsync(key);
    
    if (result) {
      metrics.redisHits.inc();
    } else {
      metrics.redisMisses.inc();
    }
    
    return result;
  };

  return {
    getAsync: getAsyncWithMetrics, // UPDATED: Use the wrapper
    setAsync: promisify(redisClient.set).bind(redisClient),
    delAsync: promisify(redisClient.del).bind(redisClient),
  };
};