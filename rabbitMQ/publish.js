const amqp = require('amqplib')

async function publish(body, channel, callback) {

        try {
            const message = body;
            const result = await channel.assertQueue("frontendSend");
            channel.sendToQueue("frontendSend", Buffer.from(JSON.stringify(message)))
            return callback({ response: `Job ${message} Success`, status: true})
    
        } catch (error) {
            console.error(error)
            return callback({response: `Job Failed!`, status: true})
    }
}

module.exports = publish;