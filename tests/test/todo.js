var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var expect = require('expect.js');
var t = require('selenium-webdriver/testing');
var driver;

function find(selector) {
  return driver.findElement(webdriver.By.css(selector));
}

function findAll(selector) {
  return driver.findElements(webdriver.By.css(selector));
}

t.describe('Todoアプリケーション', function() {
  t.before(function() {
    driver = new firefox.Driver();
    driver.manage().timeouts().implicitlyWait(5000);

    driver.get('http://localhost:4000/login');
    find('input[name="username"]').sendKeys('user');
    find('input[name="password"]').sendKeys('pass');
    find('.loginForm').submit();
  });

  t.after(function() {
    driver.quit();
  });

  t.it('Todoを追加する', function() {
    driver.get('http://localhost:4000/');
    find('.createTodoForm input[type="text"]').sendKeys('first todo');
    find('.createTodoForm').submit();
    //driver.wait(function() {
    //  return findAll('.todoList li').then(function(elements) {
    //    return elements.length === 1;
    //  });
    //}, 1000);
    find('.todoList li .todoList-text').getText().then(function(text) {
      expect(text).to.be('first todo');
    });
    find('.todoList li input[type="checkbox"]').click();
    find('.todoList li .todoList-text').getCssValue('text-decoration').then(function(val) {
      expect(val).to.be('line-through');
    });
  });
});
