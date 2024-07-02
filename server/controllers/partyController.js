
const connection = require('../database/db');

const loginParty = async (req, res) => {
    const {email, password } = req.body;

    try {
        connection.query('SELECT * FROM partyInfo WHERE partyEmail = ?', [email], (err, result) => {
            if(err) {
                console.log(err);
            }
            
            if(result.length === 0)
            {
                return res.status(400).json({error: "Invalid Email"});
            }

            if(result[0].password !== password)
            {
                return res.status(400).json({error: "Invalid Password"});
            }

            return res.status(200).json({partyName: result[0].partyName});
        });

    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

module.exports = {
    loginParty
}