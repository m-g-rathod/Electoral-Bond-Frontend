
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

            return res.status(200).json({partyName: result[0].partyName, partyId: result[0].id});
        });

    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

const getPartyAdv = async (req, res) => {
    const {id} = req.params;
    let queryRes = [];

    try {
        connection.query('SELECT advcategory.id, advcategory.categoryName, advertisements.adv_heading, advertisements.description FROM advcategory INNER JOIN advertisements ON advcategory.id = advertisements.category_id WHERE advcategory.partyId = ?', [id], (err, result) => {
            if(err)
                console.log(err);
            
            const transformedArray = result.reduce((acc, current) => {
                // Check if the current category already exists in the accumulator
                const existingCategory = acc.find(item => item.id === current.id && item.categoryName === current.categoryName);
                
                if (existingCategory) {
                  // If it exists, push the advertisement to the existing category's advertisements array
                  existingCategory.advertisements.push({
                    adv_heading: current.adv_heading,
                    description: current.description
                  });
                } else {
                  // If it doesn't exist, create a new category object and add it to the accumulator
                  acc.push({
                    id: current.id,
                    categoryName: current.categoryName,
                    advertisements: [{
                      adv_heading: current.adv_heading,
                      description: current.description
                    }]
                  });
                }
                
                return acc;
              }, []);

              console.log(transformedArray);
            return res.status(200).json({result: transformedArray});
        })
        // console.log(queryRes);
        // return res.status(200).json({result: queryRes});
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

const addPartyAdv = async (req, res) => {
    const {partyId, selectedOption, title, description} = req.body;

    try {

        let existingCategory = false;
        let category_id = 0;

        const checkCategoryExists = () => {
            return new Promise((resolve, reject) => {
                connection.query('SELECT * FROM advcategory WHERE partyId = ? AND categoryName = ?', [partyId, selectedOption], (err, result) => {
                    if (err) return reject(err);

                    if (result.length > 0) {
                        existingCategory = true;
                        category_id = result[0].id;
                    }
                    console.log('inside check');
                    resolve();
                });
            });
        };

        const insertNewCategory = () => {
            return new Promise((resolve, reject) => {
                connection.query('INSERT INTO advcategory (partyId, categoryName) VALUES (?, ?)', [partyId, selectedOption], (err, result) => {
                    if (err) return reject(err);
                    console.log('inside insert')
                    category_id = result.insertId;
                    resolve();
                });
            });
        };

        await checkCategoryExists();

        if (!existingCategory) {
            await insertNewCategory();
        }
        
        console.log(category_id);
        connection.query('INSERT INTO advertisements (category_id, description, adv_heading) VALUES (?, ?, ?)', [category_id, description, title], (err, result) => {
            if(err)
                console.log(err);
        })
        
        return res.status(201).json({message: 'Advertisement added'});

    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

module.exports = {
    loginParty,
    getPartyAdv,
    addPartyAdv
}