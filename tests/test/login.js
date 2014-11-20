var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var t = require('selenium-webdriver/testing');
var By = webdriver.By;
var expect = require('expect.js');
var driver;

t.describe('ログインページ', function() {
  t.before(function() {
    driver = new firefox.Driver();
  });

  t.after(function() {
    driver.quit();
  });

  t.it('トップにアクセスすると/loginにリダイレクトする', function() {
    // トップページにアクセスする
    driver.get('http://localhost:4000/');

    // 現在のURLを取得する
    driver.getCurrentUrl().then(function(url) {
      // ログインページにリダイレクトされているかを検証する
      expect(url).to.be('http://localhost:4000/login');
    });
  });

  t.it('username/passwordが間違っていた場合にエラーが表示される', function() {
    // ログインページにアクセス
    driver.get('http://localhost:4000/login');

    // 入力フォームに間違った情報を入力して送信
    driver.findElement(By.name('username')).sendKeys('foo');
    driver.findElement(By.name('password')).sendKeys('bar');
    driver.findElement(By.css('.loginForm')).submit();

    // エラーメッセージが表示されていることを検証
    driver.findElement(By.css('.message')).getText().then(function(text) {
      expect(text).to.be('Invalid username or password.');
    });
  });
});
