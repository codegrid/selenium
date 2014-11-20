var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var t = require('selenium-webdriver/testing');
var expect = require('expect.js');
var driver;

t.describe('ログインページ', function() {
  t.before(function() {
    driver = new firefox.Driver();
  });

  t.after(function() {
    driver.quit();
  });

  t.it('dummy', function() {});
});
