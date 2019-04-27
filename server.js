const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://boat:boat1234@ds147946.mlab.com:47946/quiz-programing');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//router req
const loginRouter = require('./routes/loginRouter')
const adminRouter = require('./routes/adminRouter')
const studentRouter = require('./routes/studentRouter')
const teacherRouter = require('./routes/teacherRouter')
const noneRouter = require('./routes/noneRouter')
const registerRouter = require('./routes/registerRouter')

//router
app.use('/login', loginRouter)
app.use('/admin', adminRouter)
app.use('/student', studentRouter)
app.use('/teacher', teacherRouter)
app.use('/none', noneRouter)
app.use('/register', registerRouter)

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'login'));
});

app.listen(port, function() {
    console.log('start port http://localhost:' + port + "/login");
});