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

    // implicitly waitを3000msに指定
    driver.manage().timeouts().implicitlyWait(3000);
  });

  t.it('Todoを追加する', function() {
    var todoText = 'sample todo';

    // Todoを作成
    var form = driver.findElement(By.css('.createTodoForm'));
    var input = form.findElement(By.name('text'));
    input.sendKeys(todoText);
    form.submit();

    // Todoが作成されたことを確認
    var itemText = driver.findElement(By.css('.todoList li:first-child .todoList-text'));
    itemText.getText().then(function(text) {
      expect(text).to.be(todoText);
    });
  });

  t.it('Todoを削除する', function() {
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

    // 要素が消えたかどうかを確認する
    var itemLocator = By.css('.todoList li:first-child');
    driver.isElementPresent(itemLocator).then(function(isPresent) {
      expect(isPresent).to.be(false);
    });
  });
});
