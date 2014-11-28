var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var expect = require('expect.js');
var t = require('selenium-webdriver/testing');
var TodoPage = require('./pages/todo');
var LoginPage = require('./pages/login');
var driver;

t.describe('ログインページ', function() {
  t.before(function() {
    driver = new firefox.Driver();
  });

  t.after(function() {
    driver.quit();
  });

  t.it('トップにアクセスすると/loginにリダイレクトする', function() {
    var todoPage = new TodoPage(driver);
    todoPage.open();

    driver.getCurrentUrl().then(function(url) {
      expect(url).to.be(LoginPage.URL);
    });
  });

  t.it('username/passwordが間違っていた場合にエラーが表示される', function() {
    var loginPage = new LoginPage(driver);
    
    loginPage
      .open()
      .loginWithInvalidUser('foo', 'bar')
      .getErrorMessage().then(function(text) {
        expect(text).to.be('Invalid username or password.');
      });
  });

  t.it('username/passwordが正しい場合はトップに遷移する', function() {
    var loginPage = new LoginPage(driver);

    loginPage.login('user', 'pass');

    driver.getCurrentUrl().then(function(url) {
      expect(url).to.be(TodoPage.URL);
    });
  });
});
