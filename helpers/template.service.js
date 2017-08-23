const BASEURL = '/templates';
const EXTENSION = 'hbs';

export default class Service {
    get(view) {
        return new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();
            request.open('GET', `${BASEURL}/${view}.${EXTENSION}`);

            request.onload = function() {
                // success
                if (request.status === 200) {
                    // resolve the promise with the parsed response text (assumes JSON)
                    resolve(request.responseText);
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
    };
};
