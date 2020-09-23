const mongoose = require('mongoose');

makeConnection = (app) => {
    let url = 'mongodb://localhost/connect';
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
    
    mongoose.connection.on('open', () => {
        console.log("Connection made to the database......")
        var port = 3000;
        app.listen(port, () => console.log("Listening on port ", port, "......."));
    }).on('error', err => console.log('Connection error:', err));
}

module.exports = makeConnection;