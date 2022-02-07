const jwt = require('jsonwebtoken')

function createBoxReservation({userId, sessionId, boxId}) {

    const claims = { userId: userId, sessionId: sessionId, boxId: boxId };
    const accessToken = jwt.sign(claims, 'secret_key')
    return accessToken;
}

module.exports = createBoxReservation;