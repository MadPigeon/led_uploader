interface Document {
    mime_type: string
}

const MIME_TYPE_IMAGE = 'image';
const MIME_TYPE_VIDEO = 'video';
const byteToMegabyteMultiplier = 1024 * 1024;
const maxFileSize = 300 * byteToMegabyteMultiplier;

export function fitsSizeConstraints(file_size): boolean {
    return file_size <= maxFileSize;
}

export function isDocumentAPhoto(document: Document) {
    return document.mime_type.startsWith(MIME_TYPE_IMAGE);
}

export function isDocumentAVideo(document: Document) {
    return document.mime_type.startsWith(MIME_TYPE_VIDEO);
}