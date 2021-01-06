const fs = require('fs');
const nunjucks = require('nunjucks');
const { runtime: { SafeString } } = require('nunjucks');

module.exports.generate = (page) => {
    const renderer = new nunjucks.Environment(new nunjucks.FileSystemLoader('../theme/templates/'));
    renderer.addExtension('AreaExtension', new AreaExtension(renderer));
    
    var content = renderer.render('pages/' + page.template + '.html', { ...page });

    fs.writeFile('../site/public/' + page.slug + '.html', content, (err) => {
        if (err) {
            console.log(err)

            return;
        }

        console.log('html written to disk for page ' + page.slug);
    });
}

function AreaExtension(renderer) {
    this.tags = ['area'];
  
    this.parse = function (parser, nodes) {
        const tok = parser.nextToken();
        const args = parser.parseSignature(null, true);
        
        parser.advanceAfterBlockEnd(tok.value);

        return new nodes.CallExtension(this, 'run', args);
    };
  
    this.run = function (context, area) {
        var output = '';
        
        context.ctx.content[area].forEach(section => {
            output += renderer.render('sections/' + section.type + '/template.html', section.data);
        });

        return new SafeString(output);
    };
}
