import ApiService from '../../api/mock.service';
import Handlebars from 'handlebars/dist/handlebars.min.js';
import TemplateService from '../../helpers/template.service.js';
import Learn from './learn';
import AddToHomeScreen from './a2hs';
import Push from './push';
import { getParameterByName } from './util';

export default class Router {
    constructor(element) {
        this.apiService = new ApiService();
        this.templateService = new TemplateService();
        this.init();
        this.mainEl = element;
    }

    init() {
        let self = this;
        self.render(location.pathname, location.search);

        // handle back button
        window.onpopstate = function(e) {
            self.render(location.pathname, location.search, true);
        };
    }

    render(url, search, pop) {
        // retrieve the data for the current page
        this.apiService.getPageData(url).then((data) => {
            let dataPromise = new Promise((resolve, reject) => {
                // if we are on the learn page
                if (url.match(/^\/learn\/?$/)) {
                    // retrieve the additional data for the learn page
                    this.apiService.getData(getParameterByName('level', search)).then((apiData) => {
                        // no data retrieved because user has completed the course
                        if (!apiData) {
                            data.view = 'finish';
                        } else {
                            data.view = 'learn';
                        }

                        data.apiData = apiData;
                        resolve();
                    });
                } else {
                    resolve();
                }
            });

            dataPromise.then(() => {
                // load the template
                this.templateService.get(data.view).then((response) => {
                    let template = Handlebars.compile(response);
                    // bind the retrieved data to the HTML
                    this.mainEl.innerHTML = template({ data: data });

                    // update meta elements
                    document.title = data.meta.title;
                    document.getElementById('title').innerHTML = data.title;

                    // user is on a learn page
                    if (data.apiData) {
                        let learn = new Learn(document.getElementById('form'));

                        // add an event listener to the next level link
                        learn.nextLevel.addEventListener('click', (e) => {
                            // prevent the browser from navigating to a new page
                            e.preventDefault();

                            // retrieve the content through the router
                            let destinationUrl = learn.nextLevel.getAttribute('href');
                            this.render(destinationUrl.split('?')[0], '?' + destinationUrl.split('?')[1]);
                        });
                    }

                    // user is on the settings page
                    if (document.getElementById('a2hs')) {
                        let addToHomeScreen = new AddToHomeScreen();
                        addToHomeScreen.configure(document.getElementById('a2hs'));
                    }

                    // user is on the settings page
                    if (document.getElementById('pushNotifications')) {
                        let push = new Push(document.getElementById('pushNotifications'));
                    }

                    if (!pop) {
                        // update the pushstate
                        window.history.pushState(null, data.title, url + (search || ''));
                    }
                });
            });
        });
    }
}
