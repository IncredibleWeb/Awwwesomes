export default class AddToHomeScreen {
    constructor() {
        this.deferredPrompt;

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();

            // store the event so it can be triggered later.
            this.deferredPrompt = e;

            return false;
        });
    }

    configure(element) {
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();

                if (this.deferredPrompt !== undefined) {
                    element.classList.remove('disabled');
                    // if the prompt has been deferred, we are able to show it
                    this.deferredPrompt.prompt();

                    // follow what the user has done with the prompt.
                    this.deferredPrompt.userChoice.then((choiceResult) => {
                        // dispose the prompt
                        this.deferredPrompt = null;
                    });
                }
            });
        }
    }
}
