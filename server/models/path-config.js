/* global  __dirname */

import fs from 'fs';
import path from 'path';
import Service from '../../api/mock.service';

export default class {
    constructor(folder, pathConfigs) {
        this.folder = folder;
        this.defaultPathConfig = {
            inlineStyles: this.getFileContents(['/inline.css']),
            remoteStyles: ['/style.css'],
            remoteScripts: ['/main.js']
        };
        this.service = new Service();
    }

    getFileContents(files) {
        let self = this;
        // concat inline styles for document <head>
        let flattenedContents = '';
        files.forEach(function(file) {
            flattenedContents += fs.readFileSync(path.resolve(__dirname) + self.folder + file);
        });

        return flattenedContents;
    }

    getConfig(urlPath) {
        let object = this.defaultPathConfig;

        // concatenate with data from the API
        object = Object.assign(object, this.service.getPageData(urlPath));

        // check if the path is actually valid.
        if (!object) {
            return null;
        }

        return {
            'data': object
        };
    }
}
