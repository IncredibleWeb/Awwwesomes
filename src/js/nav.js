import Router from './router';

export default class Nav {
    constructor(element) {
        let self = this;
        self.isVisible = false;
        self.overlay = document.getElementById('overlay');
        self.element = element;

        // initialise router
        self.router = new Router(document.querySelector('main'));

        self.element.addEventListener('click', (e) => {
            // toggle the overlay on click of the burger icon
            self.toggle();
        });

        self.overlay.addEventListener('click', (e) => {
            // simulate a click to hide the overlay
            self.element.click();
        });

        let links = self.element.parentElement.querySelectorAll('a');
        for (let link of links) {
            link.addEventListener('click', (e) => {
                // prevent the browser from navigating to a new page
                e.preventDefault();

                // retrieve the content through the router
                self.router.render(link.getAttribute('href'));

                // close the navigation
                self.element.click();
            });
        }
    }

    // toggle the overlay and the state of the navigation
    toggle() {
        let self = this;
        self.isVisible = !self.isVisible;

        if (self.isVisible) {
            self.overlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        } else {
            // delay hiding the element to show animation
            setTimeout(() => {
                self.overlay.classList.add('hidden');
            }, 300);
            document.body.style.overflow = 'initial';
        }

        // toggle the class 'visible'
        let className = 'visible';
        if (self.overlay.classList) {
            self.overlay.classList.toggle(className);
        } else {
            let classes = self.overlay.className.split(' ');
            let existingIndex = classes.indexOf(className);

            if (existingIndex >= 0) {
                classes.splice(existingIndex, 1);
            } else {
                classes.push(className);
            }

            self.overlay.className = classes.join(' ');
        }
    }
}
