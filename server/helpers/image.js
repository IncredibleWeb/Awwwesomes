export default class Image {
    static toResponsiveImage(images) {
        if (images && images.length > 0) {
            let defaultImage = images[0];
            let responsiveImageData = {
                src: defaultImage.src,
                alt: defaultImage.alt,
                srcset: defaultImage.src + ' ' + defaultImage.width + 'w'
            };
            // If there any images left over, append their contents to the srcset
            for (let i = 1; i < images.length; i++) {
                responsiveImageData.srcset = `${responsiveImageData.srcset}, ${images[i].src} ${images[i].width}w`;
            }
            return responsiveImageData;
        }
    }
}
