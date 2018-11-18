const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();

// We have a service labled as redis-server so specifying that as the host..
// docker picks that up and allows the communication to that container
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});
client.set('visits', 0);

app.get("/", (req, res) => {
    client.get('visits', (err,visits) => {
        res.status(200).json({"Number of visits": visits})
        client.set('visits', parseInt(visits) + 1)
    })
})

// Will abort the express server, used for learning about container restarts
// will see number of visits go back to 0 because node will re-execute this file
// and execute the client.set() to redis
app.get('/kill', (req, res) => {
    process.exit(0);
})

app.listen(8081, () => {
    console.log("Listening on port 8081")
})