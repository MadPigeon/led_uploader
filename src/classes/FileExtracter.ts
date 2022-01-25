interface MessageWithPhoto {
    photo: Photo[];
}
interface MessageWithVideo {
    video;
}
interface MessageWithDocument {
    document;
}
interface Photo {
    file_id: string,
    width: number,
    file_size: number
}

export function extractBestQualityPhoto(message: MessageWithPhoto) {
    const sorted_photos = message.photo.sort(compareByWidthDescending());
    return sorted_photos[0];
}

export function extractVideo(message: MessageWithVideo) {
    return message.video;
}

export function extractDocument(message: MessageWithDocument) {
    return message.document;
}

function compareByWidthDescending(): (photo1: Photo, photo2: Photo) => number {
    return (photo1, photo2) => photo2.width - photo1.width;
}
