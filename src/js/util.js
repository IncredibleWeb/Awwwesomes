// retrieves a parameter from the query string by name
export function getParameterByName(name, string) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(string || location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
