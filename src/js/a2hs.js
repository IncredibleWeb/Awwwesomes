let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();

    // store the event so it can be triggered later.
    deferredPrompt = e;

    return false;
});

let btn = document.getElementById('a2hs');
if (btn) {
    btn.addEventListener('click', () => {
        if (deferredPrompt !== undefined) {
            // if the prompt has been deferred, we are able to show it
            deferredPrompt.prompt();

            // follow what the user has done with the prompt.
            deferredPrompt.userChoice.then((choiceResult) => {
                // dispose the prompt
                deferredPrompt = null;
            });
        }
    });
}
