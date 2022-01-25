import { extractBestQualityPhoto, extractDocument, extractVideo } from '../../src/classes/FileExtracter';

test('extractPhoto exists', () => {
    expect(typeof extractBestQualityPhoto === 'function').toEqual(true);
});

test('extractPhoto extracts file_id of the widest photo', () => {
    const good_id = "good_id";
    const arbitraryFileSize = 8;
    const input = {
        message_id: 75,
        photo: [
            {
                "file_id": "small_id",
                "width": 90,
                file_size: arbitraryFileSize
            },
            {
                "file_id": good_id,
                "width": 400,
                file_size: arbitraryFileSize
            },
            {
                "file_id": "bad_id",
                "width": 320,
                file_size: arbitraryFileSize
            }
        ]
    };
    expect(extractBestQualityPhoto(input).file_id).toEqual(good_id);
});

test('extractDocument exists', () => {
    expect(typeof extractDocument === 'function').toEqual(true);
});

test('extractDocument extracts file_id from the document', () => {
    const good_id = "id1337";
    const input = { "document": { "file_id": good_id } };
    expect(extractDocument(input).file_id).toEqual(good_id);
});

test('extractVideo exists', () => {
    expect(typeof extractVideo === 'function').toEqual(true);
});

test('extractVideo extracts file_id from the video', () => {
    const good_id = "id1337", bad_id = "not_this_one";
    const input = {
        "video": {
            "thumb": { "file_id": bad_id },
            "file_id": good_id
        }
    };
    expect(extractVideo(input).file_id).toEqual(good_id);
});