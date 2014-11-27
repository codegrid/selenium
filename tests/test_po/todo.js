var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var expect = require('expect.js');
var t = require('selenium-webdriver/testing');
var TodoPage = require('./pages/todo');
var LoginPage = require('./pages/login');
var driver;

t.describe('Todoページ', function() {
  t.before(function() {
    driver = new firefox.Driver();
    driver.manage().timeouts().implicitlyWait(5000);

    var loginPage = new LoginPage(driver);
    loginPage.open().login('user', 'pass');
  });

  t.after(function() {
    driver.quit();
  });

  t.beforeEach(function() {
    driver.manage().timeouts().implicitlyWait(3000);
    driver.get('http://localhost:4000/todo/clear');
  });

  t.it('Todoを追加する', function() {
    var todoPage = new TodoPage(driver);
    var todoText = 'sample todo';

    todoPage
      .open()
      .createTodo(todoText)
      .getTodoText(0).then(function(text) {
        expect(text).to.be(todoText);
      });
  });

  t.it('Todoを削除する', function() {
    var todoPage = new TodoPage(driver);
    var todoText = 'sample todo';

    todoPage
      .open()
      .createTodo(todoText)
      .removeTodo(0)
      .acceptConfirm();

    driver.manage().timeouts().implicitlyWait(0);
    todoPage.waitForItemLength(0);
  });
});
