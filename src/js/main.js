import Nav from './nav';
import OfflineManager from './offline-manager';
import './a2hs';

if (document.getElementById('hamburger')) {
    // eslint-disable-next-line no-unused-vars
    let nav = new Nav(document.getElementById('hamburger'));
}

// register the service worker if available
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then((reg) => {
        console.log('Successfully registered service worker', reg);
    }).catch((err) => {
        console.warn('Error whilst registering service worker', err);
    });
}

window.addEventListener('online', (e) => {
    // re-sync data with server
    console.log('You are online');
    OfflineManager.removeOffline();
}, false);

window.addEventListener('offline', (e) => {
    // queue up events for server
    console.log('You are offline');
    OfflineManager.setOffline();
}, false);

if (!navigator.onLine) {
    // if the user is offline
    OfflineManager.setOffline();
}
