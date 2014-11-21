function TodoPage(driver) {
  this.driver = driver;
}

TodoPage.URL = 'http://localhost:4000/';

TodoPage.prototype.open = function() {
  this.driver.get(TodoPage.URL);
  return this;
};

module.exports = TodoPage;
