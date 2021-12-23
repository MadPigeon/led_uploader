import { extractBestQualityPhoto } from '../../src/classes/FileExtracter';

test('extractPhoto exists', () => {
    expect(typeof extractBestQualityPhoto === 'function').toEqual(true);
});

test('function exists', () => {
    let input: { message_id: number; photo: { file_id: string; file_size: number; width: number; height: number; }[]; };
    input = {
        message_id: 75,
        photo: [
            {
              "file_id": "AgACAgIAAxkBAANLYcRcIMpbCeT1HCL497UAAUatikM9AAKcuTEbM2MgSq1mSlq1OoDuAQADAgADcwADIwQ",
              "file_size": 718,
              "width": 90,
              "height": 67
            },
            {
              "file_id": "AgACAgIAAxkBAANLYcRcIMpbCeT1HCL497UAAUatikM9AAKcuTEbM2MgSq1mSlq1OoDuAQADAgADeAADIwQ", 
              "file_size": 4199,
              "width": 400,
              "height": 300
            },
            {
              "file_id": "AgACAgIAAxkBAANLYcRcIMpbCeT1HCL497UAAUatikM9AAKcuTEbM2MgSq1mSlq1OoDuAQADAgADbQADIwQ", 
              "file_size": 4303,
              "width": 320,
              "height": 240
            }
          ]
    };
    const expected = "AgACAgIAAxkBAANLYcRcIMpbCeT1HCL497UAAUatikM9AAKcuTEbM2MgSq1mSlq1OoDuAQADAgADeAADIwQ";
    expect(extractBestQualityPhoto(input)).toEqual(expected);
});