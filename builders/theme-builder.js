const fs = require('fs');
const sass = require('node-sass');

module.exports.generate = () => {
    sass.render({
        file: '../theme/styles/bootstrap.scss',
    }, (err, result) => { 
        if (err) {
            console.log(err);
    
            return;
        }
    
        fs.writeFile('../site/public/style/theme.css', result.css, (err) => {
            if (err) {
                console.log(err);
        
                return;
            }
    
            console.log('style written to disk');
        });
    });
}


