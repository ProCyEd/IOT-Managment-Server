const jwt = require('jsonwebtoken')

function createBoxReservation(userId, sessionId, boxId) {

    const claims = { userId: userId, sessionId: sessionId, boxId: boxId };
    const accessToken = jwt.sign(claims, 'secret_key')
    return accessToken;
}

function checkAvailable({userId, sessionId, boxId}, callback) {
    //call fucntion to check if box is available

    

    let available = true
    if(available) {
         callback(createBoxReservation(userId, sessionId, boxId))
    } else {
        callback(null);
    }
}

module.exports = checkAvailable;