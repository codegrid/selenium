var webdriver = require('selenium-webdriver');
var By = webdriver.By;
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

LoginPage.prototype.typeUsername = function(username) {
  this.driver.findElement(usernameLocator).sendKeys(username);
  return this;
};

LoginPage.prototype.typePassword = function(password) {
  this.driver.findElement(passwordLocator).sendKeys(password);
  return this;
};

LoginPage.prototype.submitLogin = function() {
  this.driver.findElement(formLocator).submit();
  return new TodoPage(this.driver);
};

LoginPage.prototype.submitLoginExpectingFailure = function() {
  this.driver.findElement(formLocator).submit();
  return this;
};

LoginPage.prototype.getErrorMessage = function() {
  return this.driver.findElement(messageLocator).getText();
};

module.exports = LoginPage;
