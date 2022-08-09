module.exports = function (app) {

    app.get('/api/user', require('./user').get);
    app.get('/api/users/:uid/courses', require('./userCourses').get);

    app.post('/api/courses', require('./courses').post);
    app.put('/api/courses', require('./courses').put);
    app.post('/api/courses/subscribe', require('./subscribeCourse').post);
    app.post('/api/courses/:cid/open', require('./openCourse').post);

    app.get('/api/courses/:cid/table', require('./courceChaptersAndMaterials').get);

    app.get('/api/courses/:cid/content', require('./courseContent').get);
    app.post('/api/courses/:cid/content', require('./courseContent').post);

    app.get('/api/materials/:mid/content', require('./materialsContent').get);

    app.post('/api/courses/:cid/chapters', require('./chapters').post);
    app.post('/api/courses/:cid/materials', require('./materials').post);
    app.post('/api/courses/:cid/questions', require('./questions').post);
    app.post('/api/courses/:cid/answers', require('./answers').post);

    app.put('/api/courses/:cid/chapters', require('./chapters').put);
    app.put('/api/courses/:cid/materials', require('./materials').put);
    app.put('/api/courses/:cid/questions', require('./questions').put);
    app.put('/api/courses/:cid/answers', require('./answers').put);

    app.delete('/api/courses/:cid/chapters', require('./chapters').delete);
    app.delete('/api/courses/:cid/materials', require('./materials').delete);
    app.delete('/api/courses/:cid/questions', require('./questions').delete);
    app.delete('/api/courses/:cid/answers', require('./answers').delete);

    app.get('/api/courses/:cid/score', require('./score').get);
    app.post('/api/courses/:cid/score', require('./score').post);
    app.get('/api/courses/:cid/useranswers', require('./userAnswers').get);
    app.set('/api/courses/:cid/useranswers', require('./userAnswers').post);
};