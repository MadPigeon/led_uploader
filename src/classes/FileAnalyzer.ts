interface Document {
    mime_type: string
}

const MIME_TYPE_IMAGE = 'image';
const MIME_TYPE_VIDEO = 'video';
const byteToMegabyteMultiplier = 1024 * 1024;
const maxFileSize = 300 * byteToMegabyteMultiplier;
const maxBotFileSize = 20 * byteToMegabyteMultiplier;
const maxDurationSeconds = 92;

export function fitsSizeConstraints(file_size: number): boolean {
    return file_size <= maxFileSize;
}

export function requiresFileAgent(file_size: number): boolean {
    return file_size > maxBotFileSize;
}

export function isDocumentAPhoto(document: Document): boolean {
    return document.mime_type.startsWith(MIME_TYPE_IMAGE);
}

export function isDocumentAVideo(document: Document): boolean {
    return document.mime_type.startsWith(MIME_TYPE_VIDEO);
}

/**
 * @param duration Should be undefined or less than 92 (seconds) for "true" outcome
 */
export function fitsVideoLength(duration: number): boolean {
    if (duration === undefined) {
        return true;
    }
    return duration <= maxDurationSeconds;
}