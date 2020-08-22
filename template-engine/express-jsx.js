const fs = require('fs');

function getRenderedContent(content, object) {

}

function expressJsx(filePath, options, callback) {
    fs.readFile(filePath, function(err, content){
        if (err) {
            return callback(err);
        }

        const rendered = getRenderedContent(content, options);

        return callback(null, rendered);
    });
}

module.exports = expressJsx;
