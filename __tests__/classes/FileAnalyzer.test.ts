import { fitsSizeConstraints, requiresFileAgent, isDocumentAPhoto, isDocumentAVideo } from '../../src/classes/FileAnalyzer';

const byteToMegabyteMultiplier = 1024 * 1024;

test('fitsSizeConstraints rejects huge files', () => {
  expect(fitsSizeConstraints(5000 * byteToMegabyteMultiplier)).toEqual(false);
});

test('fitsSizeConstraints accepts tiny files', () => {
  const size_in_bytes = 10 * byteToMegabyteMultiplier;
  expect(fitsSizeConstraints(size_in_bytes)).toEqual(true);
});

test('requiresFileAgent rejects huge files', () => {
  expect(requiresFileAgent(51 * byteToMegabyteMultiplier)).toEqual(true);
});

test('requiresFileAgent accepts tiny files', () => {
  const size_in_bytes = 10 * byteToMegabyteMultiplier;
  expect(requiresFileAgent(size_in_bytes)).toEqual(false);
});

test('isDocumentAPhoto rejects video', () => {
  const document = { "mime_type": "video/mp4" };
  expect(isDocumentAPhoto(document)).toEqual(false);
});

test('isDocumentAPhoto accepts photo', () => {
  const document = { "mime_type": "image/jpg" };
  expect(isDocumentAPhoto(document)).toEqual(true);
});

test('isDocumentAVideo accepts video', () => {
  const document = { "mime_type": "video/mp4" };
  expect(isDocumentAVideo(document)).toEqual(true);
});

test('isDocumentAVideo rejects photo', () => {
  const document = { "mime_type": "image/jpg" };
  expect(isDocumentAVideo(document)).toEqual(false);
});
