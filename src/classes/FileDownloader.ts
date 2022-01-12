import { HttpClient } from "typed-rest-client/HttpClient";
import * as fs from "fs";
import * as path from "path/win32";

export async function download(url : string, folder : string, fileName : string) {
  const client = new HttpClient("LED_bot_file_downloader");
  const response = await client.get(url);
  const filePath = path.join(folder, fileName);
  const file: NodeJS.WritableStream = fs.createWriteStream(filePath);
  
  if (response.message.statusCode !== 200) {
      const err: Error = new Error(`Unexpected HTTP response: ${response.message.statusCode}`);
      err["httpStatusCode"] = response.message.statusCode;
      throw err;
  }
  return new Promise((resolve, reject) => {
      file.on("error", (err) => reject(err));
      const stream = response.message.pipe(file);
      stream.on("close", () => {
          try { resolve(filePath); } catch (err) {
              reject(err);
          }
      });
  });
}