const amqp = require("amqplib");

const msg = { number: 2 };

connect();

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = channel.assertQueue("jobs");
    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
    console.log("Job succesfully sent");
} catch (error) {
    console.log(error);
  }
}
