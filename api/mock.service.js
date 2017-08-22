import _ from 'lodash/core';
import Image from '../helpers/image';

export default class Service {
    constructor() {
        this.data = [{
            'level': 1,
            'question': 'imię',
            'answers': [{
                'value': 'name; first name',
                'isCorrect': true
            },
            {
                'value': 'dog',
                'isCorrect': false
            },
            {
                'value': 'parrot',
                'isCorrect': false
            },
            {
                'value': 'alcoholic beverage',
                'isCorrect': false
            },
            {
                'value': 'table',
                'isCorrect': false
            },
            {
                'value': 'vegetable soup, broth',
                'isCorrect': false
            }]
        }, {
            'level': 2,
            'question': 'głodny',
            'answers': [{
                'value': 'sick; unwell',
                'isCorrect': false
            },
            {
                'value': 'hungry',
                'isCorrect': true
            },
            {
                'value': 'bread',
                'isCorrect': false
            },
            {
                'value': 'little, small',
                'isCorrect': false
            },
            {
                'value': 'alcoholic beverage',
                'isCorrect': false
            },
            {
                'value': 'fried chicken',
                'isCorrect': false
            }]
        }, {
            'level': 3,
            'question': 'tak',
            'answers': [{
                'value': 'no',
                'isCorrect': false
            },
            {
                'value': 'thank you',
                'isCorrect': false
            },
            {
                'value': 'at yours',
                'isCorrect': false
            },
            {
                'value': 'cheers; bless you',
                'isCorrect': false
            },
            {
                'value': 'yes',
                'isCorrect': true
            },
            {
                'value': 'good night',
                'isCorrect': false
            }]
        }];

        this.pageConfig = {
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
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, quis hic iure est ex, provi consectetur praesentium, atque facilis dicta voluptas veritatis dolore voluptatibus ut nisi doloribus minima optio mollitia dignissimos totam exercitationem excepturi et provident. Voluptates sapiente sed voluptate eaque est</p>`
            },
            '/learn': {
                view: 'learn',
                meta: {
                    title: 'Learn Polish'
                },
                title: 'Learn Polish'
            },
            '/settings': {
                view: 'settings',
                meta: {
                    title: 'Settings'
                },
                title: 'Settings',
                html: `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, quis hic iure est ex, provi consectetur praesentium, atque facilis dicta voluptas veritatis dolore voluptatibus ut nisi doloribus minima optio mollitia dignissimos totam exercitationem excepturi et provident. Voluptates sapiente sed voluptate eaque est</p>`
            }
        };
    }

    getPageData(urlPath) {
        return this.pageConfig[urlPath];
    }

    getData(level) {
        level = level || 1;
        return _.find(this.data, (item) => {
            return item.level === parseInt(level);
        });
    }
}
