const fs            = require('fs');
const { program }   = require('commander');

const themeBuilder  = require('./builders/theme-builder');
const pageBuilder   = require('./builders/page-builder');
const sectionBuilder   = require('./builders/section-builder');

program.command('site')
    .description('generates static files for given site')
    .action(() => {
        fs.readdir('../site/data/pages/', (err, files) => {
            files.forEach((file) => {
                const pageConfig = JSON.parse(fs.readFileSync('../site/data/pages/' + file));

                pageBuilder.generate(pageConfig);
            });
        });

        themeBuilder.generate();
    });

program.command('page <page>')
    .description('generates static files for given page of given site')
    .action((page) => {
        const pageConfig = JSON.parse(fs.readFileSync('../site/data/pages/' + page + '.json'));
        
        pageBuilder.generate(pageConfig);
    });

program.command('theme')
    .description('generates static assets for given site')
    .action(() => {
        themeBuilder.generate();
    });

program.command('thumbnails')
    .description('generates static assets for given site')
    .action(() => {
        sectionBuilder.generate();
    });

program.parse(process.argv);