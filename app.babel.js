/* global  __dirname */
/* global  process */

'use strict';

import http from 'http';
import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
import PathConfig from './server/models/path-config';
import bodyParser from 'body-parser';
import compression from 'compression';
import session from 'express-session';
import _ from 'lodash/core';
import Service from './api/mock.service';
import HandlebarsHelpers from './helpers/handlebars';

let app = express();

// enable g-zip compression
app.use(compression());

// Setup body parser middleware for parsing POST request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let viewsDir = './src/templates';

// setup express to use handlebars as the templating engine
let hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, `${viewsDir}/layouts`),
    partialsDir: path.join(__dirname, `${viewsDir}/partials`),
    extname: '.hbs'
});
app.set('views', path.join(__dirname, `${viewsDir}`));
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// register handlebar helpers
HandlebarsHelpers.registerHandlebarsHelpers();

// setup server for static assets
app.use('/', express.static(`${process.env.outputFolder}`, { maxAge: 604800000 }));

// setup session middleware
app.use(session({
    secret: 'test',
    cookie: { maxAge: 1200000 },
    unset: 'destroy',
    resave: true,
    saveUninitialized: false,
    sameSite: true
}));

let service = new Service();

let pathConfig = new PathConfig(`/../../${process.env.outputFolder}`);

// setup server urls
app.post('/learn', (req, res) => {
    if (req.body) {
        // store the user's selection in the session
        req.session.answer = req.body.answer;
        // notify the request that it was successful
        req.session.isValid = req.body.answer === 'name; first name';
    }

    res.redirect('/learn' + '?level=' + (req.body.level || 1));
});

// setup server urls
app.get('/*', (req, res) => {
    // extract the path from the url
    let urlSections = req.path.split('/');
    urlSections = urlSections.filter((sectionString) => {
        return sectionString.length > 0;
    });

    let urlPath = null;
    if (urlSections.length === 0) {
        if (urlSections[0] === '') {}
        urlPath = '/';
    } else {
        urlPath = '/' + urlSections.join('/');
    }

    // retrieve the path data
    let pathConfigData = pathConfig.getConfig(urlPath);
    if (!pathConfigData) {
        res.status(404).send();
        return;
    }

    // retrieve API data if we are on the '/learn' page
    if (urlPath === '/learn') {
        let apiData = service.getData(req.query.level);

        // no data retrieved because user has completed the course
        if (!apiData) {
            pathConfigData.data.view = 'finish';
        } else {
            pathConfigData.data.view = 'learn';
        }

        pathConfigData.data.apiData = apiData;

        // read data from the session
        if (req.session.answer) {
            // update the user's selected answer
            let answer = _.find(pathConfigData.data.apiData.answers, (item) => {
                return item.value === req.session.answer;
            });

            answer.isSelected = true;
            if (answer.isCorrect) {
                // allow access to the next level
                pathConfigData.allowNextLevel = true;
            }

            // clear the session
            delete req.session.answer;
            delete req.session.isValid;
        }
    }

    // render the response
    res.render(pathConfigData.data.view, pathConfigData);
});

let port = process.env.port || 3000;
http.createServer(app).listen(port, () => {
    return console.log(`Running Example on localhost:${port}`);
});

module.exports = app;
