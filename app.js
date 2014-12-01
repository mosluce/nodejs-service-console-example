/**
 * Created by mosluce on 14/12/1.
 */
var express      = require('express');
var app          = express();
var port         = process.env.PORT || 3000;
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var passport     = require('passport');
var mongoose     = require('mongoose');
var flash        = require('connect-flash');
var session      = require('express-session');
var morgan       = require('morgan');
var layouts = require('express-ejs-layouts');

//連線字串
mongoose.connect(process.env.MONGODB || require('./configs/database').uri);

//通行證設定
require('./configs/passport')(passport);

//套用 middleware
app.use(morgan('dev'));
app.use(express.static(process.cwd() + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//選擇 view engine
app.set('view engine', 'ejs');
app.set('layout', '_layout');
app.use(layouts);

//其他 middleware 初始化 & 套用
app.use(session({
    secret: 'dsahajkh@QLHadsajldhskfdsalhdgcksdochwkhxlsxhiwdcowqoHEOHlakdh',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//初始化 route
app.use(require('./configs/route')(passport));

//啟動
app.listen(port);