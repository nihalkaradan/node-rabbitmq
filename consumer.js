const amqp = require("amqplib");

connect();

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = channel.assertQueue("jobs");
    channel.consume("jobs", (message) => {
        const input = JSON.parse(message.content.toString());
        console.log(`received : ${input.number}`);
        if(input.number == 2){
            channel.ack(message);
        }
    });
  } catch (error) {
    console.log(error);
  }
}
