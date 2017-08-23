import _ from 'lodash/core';
import Request from './mock.request';
import pageData from './pages.json';
import Adapter from './mock.adapter';

export default class Service {
    constructor() {
        this.adapter = new Adapter();
        this.pageData = this.adapter.toPages(pageData);
    }

    get(url) {
        return new Promise(function(resolve, reject) {
            // Using Request abstracts away dealing with XMLHttpRequest
            let requestBuilder = new Request();
            let request = requestBuilder.getRequest();

            request.open('GET', url);
            request.onload = function() {
                // success
                if (request.status === 200) {
                    // resolve the promise
                    resolve(JSON.parse(request.responseText));
                } else {
                    // error retrieving file
                    reject(Error(request.statusText));
                }
            };

            request.onerror = function() {
                // network errors
                reject(Error('Network Error'));
            };

            request.send();
        });
    }

    getPageData(urlPath) {
        return Promise.resolve(this.pageData[urlPath]);
    }

    getData(level) {
        level = level || 1;
        return this.get('http://localhost:3000/api/data.json').then((response) => {
            return _.find(response, (item) => {
                return item.level === parseInt(level);
            });
        }).catch((error) => {
            console.log('Unable to retrieve API data:', error);
        });
    }
}
