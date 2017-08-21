import fs from 'fs';
import _ from 'lodash/core';

export default class Service {
    getSync(level) {
        level = level || 1;
        let fileData = JSON.parse(fs.readFileSync('./api/data.json', 'utf8'));
        return _.find(fileData, (item) => {
            return item.level === parseInt(level);
        });
    }
}
