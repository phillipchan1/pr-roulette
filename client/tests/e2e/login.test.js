var config = require('../../../nightwatch.conf.js');

module.exports = { // adapted from: https://git.io/vodU0
  'Check Login': function(browser) {
    browser
      .url('http://localhost:80')
      .waitForElementVisible('body')
      .assert.title('PR Roulette')
      .saveScreenshot('title.png')
      .end();
  }
};