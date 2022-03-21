const jwt = require('jsonwebtoken')
const cookie = require('cookie')

async function login(req, callback) {

    var person = null
    let people = [
            {
                email: 'corsonca23@mail.vmi.edu',
                password: 'admin'
            },
            {
                email: 'shelleywr23@mail.vmi.edu',
                password: 'admin'
            },
            {
                email: 'millercc23@mail.vmi.edu',
                password: 'admin'
            },
            {
                email: 'noonanam24@mail.vmi.edu',
                password: 'admin'
            },
            {
                email: 'ricepw24@mail.vmi.edu',
                password: 'admin'
            },
        ];

        for(let i = 0; i < people.length; i++) {
        if(people[i].email == req.body.email) {
            person = people[i];
            break;
        }
        }

        if(person == null) return callback(null);

        if (req.body.password == person.password) {
        const claims = { myPersonEmail: person.email };
        const accessToken = jwt.sign(claims, "secret_key")
        //const jwt = sign(claims, secret, { expiresIn: '1h' });
        
        return callback(accessToken);
        } else {
        return callback(null);
        }

        /* compare(req.body.password, person.password, function(err, result) {
        console.log(req.body.password)
        console.log(person.password)
        if (!err && result) {
            const claims = { myPersonEmail: person.email };
            const jwt = sign(claims, secret, { expiresIn: '1h' });
            res.json({ authToken: jwt });
        } else {
            res.json({ message: 'Ups, something went wrong! Inside though' });
        }
        }); */
}

module.exports = login;