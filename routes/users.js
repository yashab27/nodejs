const userRoutes = (app, fs) => {

    // variables
    const dataPath = './data/users.json';

    // helper methods
    const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    // READ
    app.get('/users', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            res.send(JSON.parse(data));
        });
    });

    // CREATE
    app.post('/users', (req, res) => {

        readFile(data => {
                const newUserId = Date.now().toString();
                data[newUserId.toString()] = req.body;

                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send('New user added successfully');
                });
            },
            true);
    });


    // UPDATE
    app.put('/users/:id', (req, res) => {

        readFile(data => {
                const userId = req.params["id"];
                data[userId] = req.body;

                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send(`User id:${userId} updated`);
                });
            },
            true);
    });


    // DELETE
    app.delete('/users/:id', (req, res) => {

        readFile(data => {
                const userId = req.params["id"];
                delete data[userId];

                writeFile(JSON.stringify(data, null, 2), () => {
                    res.status(200).send(`User id:${userId} removed`);
                });
            },
            true);
    });
};

module.exports = userRoutes;