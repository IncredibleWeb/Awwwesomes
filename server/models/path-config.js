/* global  __dirname */

import fs from 'fs';
import path from 'path';
import Image from '../../helpers/image';

export default class {
    constructor(folder, pathConfigs) {
        this.folder = folder;
        this.pathConfigs = {
            '/': {
                view: 'index',
                meta: {
                    title: 'Awwwesomes Summer Meetup 2017'
                },
                title: 'Awwwesomes',
                images: Image.toResponsiveImage([{
                    src: '/img/banner.jpg',
                    alt: 'Poznan Old Market',
                    width: 720
                }, {
                    src: '/img/banner@2x.jpg',
                    alt: 'Poznan Old Market',
                    width: 1440
                }]),
                html: `
                    <h1>Let's Learn!</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, quis hic iure est ex, provi consectetur praesentium, atque facilis dicta voluptas veritatis dolore voluptatibus ut nisi doloribus minima optio mollitia dignissimos totam exercitationem excepturi et provident. Voluptates sapiente sed voluptate eaque est</p>`,
                inlineStyles: this.getFileContents(['/inline.css']),
                remoteStyles: ['/style.css'],
                remoteScripts: ['/main.js']
            },
            '/learn': {
                view: 'learn',
                meta: {
                    title: 'Learn Polish'
                },
                title: 'Learn Polish',
                inlineStyles: this.getFileContents(['/inline.css']),
                remoteStyles: ['/style.css'],
                remoteScripts: ['/main.js']
            },
            '/settings': {
                view: 'settings',
                meta: {
                    title: 'Settings'
                },
                title: 'Settings',
                html: `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, quis hic iure est ex, provi consectetur praesentium, atque facilis dicta voluptas veritatis dolore voluptatibus ut nisi doloribus minima optio mollitia dignissimos totam exercitationem excepturi et provident. Voluptates sapiente sed voluptate eaque est</p>`,
                inlineStyles: this.getFileContents(['/inline.css']),
                remoteStyles: ['/style.css'],
                remoteScripts: ['/main.js']
            }
        };
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
        let object = this.pathConfigs[urlPath];

        // check if the path is actually valid.
        if (!object) {
            return null;
        }

        return {
            'data': object
        };
    }
}
