const puppeteer = require('puppeteer');  
const fs = require('fs');
const pageBuilder = require('./page-builder');

module.exports.generate = async (site, theme) => {
  var page = {
    slug: 'thumb',
    template: 'page'
  };

  fs.readdir('../theme/templates/sections/', (err, files) => {
    var sections = [];
    files.forEach((directory) => {
      const sectionConfig = JSON.parse(fs.readFileSync('../theme/templates/sections/' + directory + '/data.json'));

      sections.push({
        type: directory,
        data: sectionConfig
      });
    });

    page.content = {
      main: sections
    };

    pageBuilder.generate(page);
  });

  const browser = await puppeteer.launch();
  const pageBrowser = await browser.newPage();
  await pageBrowser.goto('file:///home/nick/GrowrsCorp/cabin/site/public/thumb.html');          // go to site

  for (let index = 0; index < page.content.main.length; index++) {
    var section = page.content.main[index];

    await pageBrowser.waitForSelector('.section-' + section.type); 
    const element = await pageBrowser.$('.section-' + section.type);
    await element.screenshot({
      path: '../site/public/thumbnails/' + section.type + '.png'
    });
  }

  await browser.close();
};