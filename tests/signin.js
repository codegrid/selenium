var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var expect = require('expect.js');
var t = require('selenium-webdriver/testing');
var driver;

function find(selector) {
  return driver.findElement(webdriver.By.css(selector));
}

t.describe('ログインページ', function() {
  t.before(function() {
    driver = new firefox.Driver();
  });

  t.after(function() {
    driver.quit();
  });

  t.it('トップにアクセスすると/signinにリダイレクトする', function() {
    driver.get('http://localhost:4000/');

    driver.getCurrentUrl().then(function(url) {
      expect(url).to.be('http://localhost:4000/signin');
    });
  });

  t.it('username/passwordが間違っていた場合にエラーが表示される', function() {
    driver.get('http://localhost:4000/signin');

    find('input[name="username"]').sendKeys('foo');
    find('input[name="password"]').sendKeys('bar');
    find('.signinForm').submit();
    find('.message').getText().then(function(text) {
      expect(text).to.be('Invalid username or password.');
    });
  });

  t.it('username/passwordが正しい場合はトップに遷移する', function() {
    driver.get('http://localhost:4000/signin');

    find('input[name="username"]').sendKeys('user');
    find('input[name="password"]').sendKeys('pass');
    find('.signinForm').submit();
    driver.getCurrentUrl().then(function(url) {
      expect(url).to.be('http://localhost:4000/');
    });
  });
});
