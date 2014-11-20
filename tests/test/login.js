var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var t = require('selenium-webdriver/testing');
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
});
