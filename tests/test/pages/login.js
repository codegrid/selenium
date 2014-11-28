var By = require('selenium-webdriver').By;
var TodoPage = require('./todo');

var usernameLocator = By.name('username');
var passwordLocator = By.name('password');
var formLocator = By.css('.loginForm');
var messageLocator = By.css('.message');

function LoginPage(driver) {
  this.driver = driver;
}

LoginPage.URL = 'http://localhost:4000/login';

LoginPage.prototype.open = function() {
  this.driver.get(LoginPage.URL);
  return this;
};

LoginPage.prototype._login = function(username, password) {
  this.driver.findElement(usernameLocator).sendKeys(username);
  this.driver.findElement(passwordLocator).sendKeys(password);
  this.driver.findElement(formLocator).submit();
};

LoginPage.prototype.login = function(username, password) {
  this._login(username, password);

  return new TodoPage();
};

LoginPage.prototype.loginWithInvalidUser = function(username, password) {
  this._login(username, password);

  return this;
};

LoginPage.prototype.getErrorMessage = function() {
  return this.driver.findElement(messageLocator).getText();
};

module.exports = LoginPage;
