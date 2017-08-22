import ApiService from '../../api/mock.service';
import Handlebars from 'handlebars/dist/handlebars.min.js';
import TemplateService from '../../helpers/template.service.js';

export default class Router {
    constructor(element) {
        this.apiService = new ApiService();
        this.templateService = new TemplateService();
        this.init();
        this.mainEl = element;
    }

    init() {
        this.render(location.pathname, location.search);
    }

    render(url, search) {
        // retrieve the data for the current page
        let data = this.apiService.getPageData(url);

        // if we are on the learn page
        if (url.match(/^\/learn\/?$/)) {
            // retrieve the additional data for the learn page
            let apiData = this.apiService.getData(search);

            // no data retrieved because user has completed the course
            if (!apiData) {
                data.view = 'finish';
            }

            data.apiData = apiData;
        }

        // load the template
        this.templateService.get(data.view).then((response) => {
            let template = Handlebars.compile(response);
            // bind the retrieved data to the HTML
            this.mainEl.innerHTML = template({ data: data });

            // update meta elements
            document.title = data.meta.title;
            document.getElementById('title').innerHTML = data.title;
        });
    }
}
