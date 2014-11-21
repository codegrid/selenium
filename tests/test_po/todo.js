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
    loginPage
      .open()
      .typeUsername('user')
      .typePassword('pass')
      .submitLogin();
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
    var firstTodo = 'first todo';
    var secondTodo  = 'second todo';

    todoPage
      .open()
      .createTodo(firstTodo)
      .createTodo(secondTodo)
      .waitItemLength(2)
      .getTodoItemText(0, function(text) {
        expect(text).to.be(firstTodo);
      })
      .getTodoItemText(1, function(text) {
        expect(text).to.be(secondTodo);
      });
  });
});
