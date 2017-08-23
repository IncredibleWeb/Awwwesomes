import { XMLHttpRequest as ServerXMLHttpRequest } from 'xmlhttprequest';

/*
    This class is required to adapt the service to either the server or the client
    since XMLHttpRequest is not available on the server side, but a wrapper for it
    is available via NPM.
    https://stackoverflow.com/questions/42460102/xmlhttprequest-not-defined-when-using-jsonloader-in-node
*/

export default class Request {
    getRequest() {
        let isServer = this.isOnServer();
        let request = null;
        // If we're on the server, then use the imported version
        if (isServer) {
            request = new ServerXMLHttpRequest();
        } else {
            request = new XMLHttpRequest();
        }
        return request;
    }
    // Check if we are on the server or on the client
    // Reference:
    // https://stackoverflow.com/questions/4224606/how-to-check-whether-a-script-is-running-under-node-js
    isOnServer() {
        return !(typeof window !== 'undefined' && window.document);
    }
}
