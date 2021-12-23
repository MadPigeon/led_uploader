interface MessageWithPhoto {
    photo: { file_id: string; width: number; }[];
}
interface MessageWithVideo {
    video: { file_id: string; };
}
interface MessageWithDocument {
    document: { file_id: string; }
}
interface Photo {
    width: number;
}

export function extractBestQualityPhoto(message: MessageWithPhoto) {
    const sorted_photos = message.photo.sort(compareByWidthDescending());
    return sorted_photos[0].file_id;
}

export function extractVideo(message: MessageWithVideo) {
    return message.video.file_id;
}

export function extractDocument(message: MessageWithDocument) {
    return message.document.file_id;
}

function compareByWidthDescending(): (photo1: Photo, photo2: Photo) => number {
    return (photo1, photo2) => photo2.width - photo1.width;
}
