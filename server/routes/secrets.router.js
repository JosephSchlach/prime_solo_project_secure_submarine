const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('req.user:', req.user);
    const action = ('SELECT * FROM "secret" WHERE "secrecy_level" <= $1;')
    pool.query(action, [req.user.clearance_level])
        .then(results => res.send(results.rows))
        .catch(error => {
            console.log('Error making SELECT for secrets:', error);
            res.sendStatus(500);
        });
});

module.exports = router;