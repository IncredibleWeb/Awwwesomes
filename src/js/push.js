export default class PushNotification {
    constructor(element) {
        this.init();

        element.addEventListener('change', (e) => {
            if (element.checked) {
                // enable push
                this.subscribe();
            } else {
                // disable push
                this.unsubscribe();
            }
        });
    }

    init() {
        if (!('serviceWorker' in navigator)) {
            console.warn('Notifications aren\'t supported.');
            return;
        }

        if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
            console.warn('Notifications aren\'t supported.');
            return;
        }

        // Check if push messaging is supported
        if (!('PushManager' in window)) {
            console.warn('Push messaging isn\'t supported.');
            return;
        }

        // if its denied, it's a permanent block until the user changes the permission
        if (Notification.permission === 'denied') {
            console.warn('The user has blocked notifications.');
            return;
        }

        // we need the service worker registration to check for a subscription
        navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
            // do we already have a push message subscription?
            serviceWorkerRegistration.pushManager.getSubscription().then((subscription) => {
                if (!subscription) {
                    return;
                }

                // register on GCM
            }).catch((err) => {
                console.warn('Error during getSubscription()', err);
            });
        });
    }

    subscribe() {
        return new Promise((resolve, reject) => {
            if (Notification.permission === 'denied') {
                return reject(new Error('Push messages are blocked.'));
            }

            if (Notification.permission === 'granted') {
                return resolve();
            }

            if (Notification.permission === 'default') {
                Notification.requestPermission((result) => {
                    if (result !== 'granted') {
                        reject(new Error('Bad permission result'));
                    }

                    resolve();
                });
            }
        }).then(() => {
            // We need the service worker registration to access the push manager
            return navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
                return serviceWorkerRegistration.pushManager.subscribe({
                    userVisibleOnly: true
                });
            }).then((subscription) => {
                if (subscription.endpoint.indexOf('https://android.googleapis.com/gcm/send') === 0) {
                    let endpointParts = subscription.endpoint.split('/');
                    let registrationId = endpointParts[endpointParts.length - 1];
                    console.log('registrationId:', registrationId);
                }
                // user has subscribed successfully
            }).catch((e) => {
                console.warn('Subscription error: ', e);
            });
        })
        .catch((e) => {
            // permission prompt issue
            console.warn('Subscription error: ', e);
        });
    }

    unsubscribe() {
        navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
            // to unsubscribe from push messaging, you need get the subscription object, which you can call unsubscribe() on.
            serviceWorkerRegistration.pushManager.getSubscription().then((pushSubscription) => {
                // check we have a subscription to unsubscribe
                if (!pushSubscription) {
                    // no subscription object, so set the state to allow the user to subscribe to push
                    return;
                }

                // we have a subscription, so call unsubscribe on it
                pushSubscription.unsubscribe().then((successful) => {
                    // TODO
                }).catch((e) => {
                    // we failed to unsubscribe, this can lead to an unusual state, so may be best to remove the users data from your data store and inform the user that you have done so
                    console.warn('Unsubscription error: ', e);
                });
            }).catch((e) => {
                console.error('Error thrown while unsubscribing from push messaging.', e);
            });
        });
    }
}
