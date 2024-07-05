const connection = require('../database/db');

const getParties = async (req, res) => {
    try {
        connection.query('SELECT id, partyName FROM partyInfo', (err, result) => {
            if(err)
                console.log(err);

            console.log(result);

            return res.status(200).json({result: result});
        })
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

module.exports = {
    getParties
}