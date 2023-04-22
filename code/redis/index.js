//index.js
(async () => {

    const redis = require('redis');
    const client = redis.createClient();
    client.connect();

    client.on("error", (error) => {
        console.error(error);
    });

    const result = await client.set("user1", "Cleitin Mil grau");
    console.log(`inserido: ${result}`);

    const result2 = await client.get("user1");
    console.log(`byscado: ${result2}`);

})();