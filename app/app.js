var express = require('express');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var ect = require('ect');
var Datastore = require('nedb');
var app = express();
var env = process.env.NODE_ENV || 'development';

var USERNAME = 'user';
var PASSWORD = 'pass';

// init DB
var db = new Datastore();

// set template engine
var renderer = ect({
  cache: false,
  root: __dirname + '/views',
  ext : '.html'
});
app.engine('html', renderer.render);
app.set('view engine', 'html');

// load middleware
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: '[secret]' }));

// routes

/**
 * アプリケーションのトップページを描画。
 * ログインしていなければログインページにリダイレクトする。
 */
app.get('/', function(req, res) {
  if (!req.session.user) return res.redirect('/signin');

  res.render('index', { user: req.session.user });
});

/**
 * ログインページを描画
 */
app.get('/signin', function(req, res) {
  res.render('signin');
});

/**
 * ログイン情報を受け取ってOKならセッションに記録してトップページへ。
 * ログイン情報が間違っていたらログイン画面にエラーを表示。
 */
app.post('/signin', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  if (username === USERNAME && password === PASSWORD) {
    req.session.user = { name: username };
    res.redirect('/');
  }
  else {
    res.render('signin', { error : true });
  }
});

/**
 * ログアウト。セッションを破棄してログインページにリダイレクト。
 */
app.get('/signout', function(req, res) {
  req.session = null;
  res.redirect('/signin');
});

/**
 * TodoリストをJSONで返す
 */
app.get('/todo', function(req, res, next) {
  db.find({}).sort({ created: -1 }).exec(function(err, todoList) {
    if (err) return next(err);

    res.json(todoList);
  });
});

/**
 * Todoの新規作成を行う。成功したら新規作成されたtodoオブジェクトをJSONで返す。
 */
app.post('/todo', function(req, res, next) {
  var text = req.body.text;

  if (!text) {
    return res.json({ error: 'text is required' }, 400);
  }

  var doc = {
    text: text,
    completed: false,
    created: new Date()
  };

  db.insert(doc, function(err, todo) {
    if (err) return next(err);

    setTimeout(function() { res.json(todo); }, 500);
  });
});

/**
 * 一件のtodoの更新を行う。許容するパラメータはcompletedのみとする。
 */
app.put('/todo/:id', function(req, res) {
  var id = req.params.id;
  var completed = req.body.completed;
  var query = { _id: id };
  var update = { $set: { completed: !!completed } };
  var opts = {};

  db.update(query, update, opts, function(err) {
    if (err) return next(err);

    res.sendStatus(204);
  });
});

/**
 * idで指定されたtodoを一件削除する。
 */
app.delete('/todo/:id', function(req, res) {
  db.remove({ _id: req.params.id }, function(err) {
    if (err) return next(err);

    res.sendStatus(204);
  });
});

app.listen(process.env.PORT || 4000, function() {
  console.log('Example app listening at http://localhost:%d', this.address().port);
});
