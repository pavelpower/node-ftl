node-ftl
========

ftl converter under nodejs

## how use?

```bash
 $ npm i node-ftl
```

and create `index.js` file with content:

```javascript
var ftl = require('./');
var path = require('path');

ftl.processTemplate({
    data: data,
    settings: {
        encoding: 'utf-8',
        viewFolder: path.join(process.cwd(), 'views/')
    },
    filename: 'index.ftl'
}).on('end', function(err, html) {
    fs.writeFileSync('index.html', html, 'utf8');
});

```


## how used with expressjs?

You can look file [server.js](./server.js)