var webdriver = require('selenium-webdriver');
var expect = require('expect.js');
var t = require('selenium-webdriver/testing');
var TodoPage = require('./pages/todo');
var LoginPage = require('./pages/login');
var driver;

t.describe('ログインページ', function() {
  t.before(function() {
    var cap = new webdriver.Capabilities();
    cap.set('platformName', 'iOS');
    cap.set('deviceName', 'iPhone Simulator');
    cap.set('platformVersion', '8.1');
    cap.set('browserName', 'Safari');
    driver = new webdriver.Builder()
                  .usingServer('http://localhost:4723/wd/hub')
                  .withCapabilities(cap)
                  .build();
    driver.manage().timeouts().implicitlyWait(3000);
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

    driver.wait(function() {
      return driver.getCurrentUrl().then(function(url) {
        return url === 'http://localhost:4000/';
      });
    });
  });
});
