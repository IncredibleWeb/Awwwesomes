/* Disclaimer: This is a very crude implementation of a routing engine and it is recommended to replace it with your preferred framework */
import Image from '../../helpers/image';

if (location.pathname.match(/^\/?$/)) {
    // retrieve the data for the home page
    let data = {
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
    };

    // TODO: bind the retrieved data to the HTML
} else if (location.pathname.match(/^\/learn\/?$/)) {
    // retrieve the data for the learn page
    console.log('learn');
} else if (location.pathname.match(/^\/settings\/?$/)) {
    // retrieve the data for the settings page
    console.log('settings');
}
