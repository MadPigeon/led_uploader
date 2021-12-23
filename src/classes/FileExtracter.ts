export function extractBestQualityPhoto(message: { message_id: number; photo: { file_id: string; file_size: number; width: number; height: number; }[]; }) {
    const sorted_photos = message.photo.sort(compareByWidthDescending());
    return sorted_photos[0].file_id;
}

function compareByWidthDescending(): (photo1: { width: number; }, photo2: { width: number; }) => number {
    return (photo1, photo2) => photo2.width - photo1.width;
}
