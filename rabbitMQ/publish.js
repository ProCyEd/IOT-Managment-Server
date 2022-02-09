const amqp = require('amqplib')

async function publish(body, callback) {

        try {
            console.log(body)
            const message = body;
            const connection = await amqp.connect("amqps://msdqunsz:8HfRRHR4k_1MnSrcSnL2dFadlDbYhsGJ@fish.rmq.cloudamqp.com/msdqunsz")
            const channel = await connection.createChannel();
            const result = await channel.assertQueue("frontendSend");
            channel.sendToQueue("frontendSend", Buffer.from(JSON.stringify(message)))
            return callback({ response: `Job ${message} Success`, status: true})
            
        } catch (error) {
            console.error(error)
            return callback({response: `Job Failed!`, status: true})
    }
}

module.exports = publish;