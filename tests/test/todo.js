var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var t = require('selenium-webdriver/testing');
var By = webdriver.By;
var expect = require('expect.js');
var driver;

t.describe('Todoページ', function() {
  t.before(function() {
    driver = new firefox.Driver();

    // loginページに遷移
    driver.get('http://localhost:4000/login');

    // 正しいアカウントでログイン
    driver.findElement(By.name('username')).sendKeys('user');
    driver.findElement(By.name('password')).sendKeys('pass');
    driver.findElement(By.css('.loginForm')).submit();
  });

  t.after(function() {
    driver.quit();
  });

  t.beforeEach(function() {
    // データを初期化する
    driver.get('http://localhost:4000/todo/clear');
  });

  t.it('dummy', function() {});
});
