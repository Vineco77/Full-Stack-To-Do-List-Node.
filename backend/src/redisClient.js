const redis = require("redis");

const redisClient = redis.createClient({
  url: "redis://18.230.65.71:6379", // Ou substitua pela URL de conexão do Redis Insight
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  await redisClient.connect();
})();

module.exports = redisClient;
