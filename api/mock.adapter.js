import Image from '../helpers/image';

export default class Adapter {
    toPage(data) {
        if (data) {
            return {
                title: data.title,
                html: data.html,
                meta: {
                    title: data.meta.title
                },
                images: Image.toResponsiveImage(data.images),
                view: data.view
            };
        }
    }

    toPages(data) {
        let pages = {};
        if (data) {
            for (let key in data) {
                pages[key] = this.toPage(data[key]);
            }
        }
        return pages;
    }
}
