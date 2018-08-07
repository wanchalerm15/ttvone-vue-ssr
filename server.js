//server.js
const express = require('express');
const server = express();
const fs = require('fs');
const path = require('path');

//obtain bundle
const createApp = require('./dist/server.bundle.js').default;

//get renderer from vue server renderer
const renderer = require('vue-server-renderer').createRenderer({
    //set template
    template: fs.readFileSync('./index.html', 'utf-8')
        .replace('<div id="app"></div>', '<!--vue-ssr-outlet-->')
});

server.use('/dist', express.static(path.join(__dirname, './dist')));

server.get('/api/testing', (req, res) => res.json([
    { id: 1, title: 'Server 000001' },
    { id: 2, title: 'Server 000002' },
    { id: 3, title: 'Server 000003' },
]));

//start server
server.get('*', (req, res) => {
    createApp({ url: req.url }).then((app) => {
        //context to use as data source
        //in the template for interpolation
        const context = {
            title: 'Vue JS - Create application',
            meta: `
                <meta charset="utf-8">
            `,
            state: app.$store.state
        };
        renderer.renderToString(app, context, function (err, html) {
            if (err) {
                if (err.code === 404) res.status(404).end('Page not found')
                else res.status(500).end('Internal Server Error')
            }
            else res.end(html)
        });
    }, (err) => {
        // console.log(err);
    });
});

server.listen(8080, () => console.log('Server started.'));