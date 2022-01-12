import * as path from "path";

const config_path = path.join(process.cwd(), './config/app_config.json');

let configObject = undefined;

export function getConfig() {
  if (configObject == undefined) {
    configObject = readFileToJSON(config_path);
  }

  return configObject;
}

function readFileToJSON(file_path : string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fs = require("fs");
    const rawdata = fs.readFileSync(file_path);
    return JSON.parse(rawdata);
}
