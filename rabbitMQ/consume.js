const amqp = require('amqplib');

async function do_consume(callback) {
    console.log('consumer started')
    
    var q = 'backendSend';
    await channel.assertQueue(q, {durable: true});
    await channel.consume(q, function (msg) {
        callback(msg)
        console.log(msg)
        channel.ack(msg);
        channel.cancel('myconsumer');
        }, {consumerTag: 'myconsumer'});
    setTimeout( function()  {
        console.log('closing')
        channel.close();
        connection.close();},  500 );
}

//do_consume()

module.exports = do_consume;
