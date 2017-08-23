import ApiService from '../../api/mock.service';
import _ from 'lodash/core';

export default class Learn {
    constructor(element) {
        this.apiService = new ApiService();
        this.element = element;
        this.init();
    }

    init() {
        let self = this;
        let formData = new FormData(self.element);
        let level = parseInt(formData.get('level'));

        let aTag = document.createElement('a');
        aTag.setAttribute('href', `/learn?level=${level + 1}`);
        aTag.classList.add('next-level');
        aTag.innerHTML = 'Next Level &raquo;';
        self.nextLevel = aTag;

        self.element.querySelectorAll('input[type=submit]').forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                // submit the user selection to the API
                let apiData = self.apiService.getData(level);
                let answer = _.find(apiData.answers, (item) => {
                    return item.value === btn.value;
                });

                // clear all other button's state
                self.element.querySelectorAll('.item').forEach(n => { n.classList.remove('selected'); });
                // mark the selected button
                btn.parentElement.parentElement.classList.add('selected');
                if (answer.isCorrect) {
                    // mark the button as correct
                    btn.parentElement.parentElement.classList.add('correct');

                    // allow access to the next level
                    self.element.insertAdjacentElement('afterEnd', aTag);
                }
            });
        });
    }
}
