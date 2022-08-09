const User = require('models/user').User;
const async = require('async');
const mongoose = require('libs/mongoose');

async.series([
    open,
    dropDatabase,
    createUsers
], function (err) {
    if (err) throw err;
    close();
});

function open(callback){
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback){
    let db = mongoose.connection.db;
    db.dropDatabase(callback)
}

function createUsers(callback) {
    let users = [
        {username: 'Vasya', password: 'supervasya'},
        {username: 'Petya', password: 'qwe123qwe'},
        {username: 'admin', password: 'thetruehero'}
    ];

    async.each(users, function (userData, callback) {
        let user = new User(userData);
        user.save(callback);
    }, callback);
}

function close(callback){
    mongoose.disconnect(callback);
}

