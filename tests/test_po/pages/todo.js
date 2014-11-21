var webdriver = require('selenium-webdriver');
var By = webdriver.By;

var todoInputLocator = By.css('.createTodoForm input[type="text"]');
var todoFormLocator = By.css('.createTodoForm');
var itemsLocator = By.css('.todoList li');
var textLocator = By.css('.todoList-text');

function TodoPage(driver) {
  this.driver = driver;
}

TodoPage.URL = 'http://localhost:4000/';

TodoPage.prototype.open = function() {
  this.driver.get(TodoPage.URL);
  return this;
};

TodoPage.prototype.createTodo = function(text) {
  var input = this.driver.findElement(todoInputLocator);
  var form = this.driver.findElement(todoFormLocator);

  input.clear();
  input.sendKeys(text);
  form.submit();

  return this;
};

TodoPage.prototype.waitItemLength = function(len) {
  this.driver.wait(function() {
    return this.driver.findElements(itemsLocator).then(function(items) {
      return items.length === len;
    });
  }.bind(this));

  return this;
};

TodoPage.prototype.getTodoItemText = function(index, fn) {
  this.driver.findElements(itemsLocator).then(function(elements) {
    return elements[index].findElement(textLocator).getText();
  });

  return this;
};

module.exports = TodoPage;
