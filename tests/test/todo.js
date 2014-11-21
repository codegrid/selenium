var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var By = webdriver.By;
var expect = require('expect.js');
var t = require('selenium-webdriver/testing');
var driver;

t.describe('Todoページ', function() {
  t.before(function() {
    driver = new firefox.Driver();

    driver.get('http://localhost:4000/login');
    driver.findElement(By.name('username')).sendKeys('user');
    driver.findElement(By.name('password')).sendKeys('pass');
    driver.findElement(By.css('.loginForm')).submit();
  });

  t.after(function() {
    driver.quit();
  });

  t.beforeEach(function() {
    driver.manage().timeouts().implicitlyWait(3000);
    driver.get('http://localhost:4000/todo/clear');
  });

  t.it('Todoを追加する', function() {
    var firstTodo = 'first todo';
    var secondTodo  = 'second todo';

    // Todoページに遷移
    driver.get('http://localhost:4000/');

    // Todoを二つ作成
    var form = driver.findElement(By.css('.createTodoForm'));
    var input = form.findElement(By.name('text'));
    input.sendKeys(firstTodo);
    form.submit();
    input.clear();
    input.sendKeys(secondTodo);
    form.submit();

    // Todoが登録されているか確認
    var list = driver.findElement(By.css('.todoList'));
    driver.wait(function() {
      return list.findElements(By.css('li')).then(function(items) {
        return items.length === 2;
      });
    });
    list.findElement(By.css('li:first-child .todoList-text'))
      .getText().then(function(text) {
        expect(text).to.be(secondTodo);
      });
    list.findElement(By.css('li:nth-child(2) .todoList-text'))
      .getText().then(function(text) {
        expect(text).to.be(firstTodo);
      });
  });

  t.it('完了/未完了を切り替える', function() {
    // Todoページに遷移
    driver.get('http://localhost:4000/');

    // Todoを作成
    var form = driver.findElement(By.css('.createTodoForm'));
    var input = form.findElement(By.name('text'));
    input.sendKeys('first todo');
    form.submit();

    // チェックボックスをクリック
    var item = driver.findElement(By.css('.todoList li:first-child'));
    var checkbox = item.findElement(By.css('input[type="checkbox"]'));
    checkbox.click();

    // 完了状態になったことを確認
    item.getAttribute('class').then(function(val) {
      expect(val.split(/\s+/)).to.contain('is-completed');
    });

    // もう一度クリックして未完了状態になることを確認
    checkbox.click();
    item.getAttribute('class').then(function(val) {
      expect(val.split(/\s+/)).to.not.contain('is-completed');
    });
  });

  t.it('Todoを削除する', function() {
    // Todoページに遷移
    driver.get('http://localhost:4000/');

    // Todoを作成
    var form = driver.findElement(By.css('.createTodoForm'));
    var input = form.findElement(By.name('text'));
    input.sendKeys('first todo');
    form.submit();

    // 削除ボタンをクリック
    var item = driver.findElement(By.css('.todoList li:first-child'));
    var removeBtn = item.findElement(By.css('.todoList-remove'));
    removeBtn.click();

    // confirmダイアログでOKを押す
    driver.switchTo().alert().accept();

    // 要素が消えるまで待つ
    driver.manage().timeouts().implicitlyWait(0);
    driver.wait(webdriver.until.stalenessOf(item));
  });
});
