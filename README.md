# selenium-sample

[CodeGrid](http://www.codegrid.net/)の「[入門、Selenium](https://app.codegrid.net/series/2014-selenium)」の記事内で使用しているサンプルです。

各サンプルの解説については上記記事をご確認ください。

## 動作環境

以下が必要です。

* [Node.js](http://nodejs.org/)
* [Firefox](https://www.mozilla.org/ja/firefox/new/)

## サンプルの内容

### /app

Todoのサンプルアプリケーションで、Node.jsでできています。以下の手順で関連インストール、

```
$ git clone https://github.com/codegrid/selenium-sample.git
$ cd selenium-sample/app
$ npm install
$ npm start
```

ブラウザで`http://localhost:4000/`にアクセスし、サンプルアプリケーションを開きます。

### /tests

Seleniumを利用したテストが置いてあります。動かし方については上記記事をご確認ください。
