var webdriver = require('selenium-webdriver');

var cap = new webdriver.Capabilities();
cap.set('platformName', 'iOS');
cap.set('deviceName', 'iPhone Simulator');
cap.set('platformVersion', '8.1');
cap.set('browserName', 'Safari');

var driver = new webdriver.Builder()
    .usingServer('http://localhost:4723/wd/hub')
    .withCapabilities(cap)
    .build();

driver.get('http://www.pxgrid.com/');
driver.quit();
