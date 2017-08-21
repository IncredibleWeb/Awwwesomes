export default class OfflineManager {
    static removeOffline() {
        // remove the offline message
        document.body.classList.remove('offline');
    }

    static setOffline() {
        document.body.classList.add('offline');
    }
}
