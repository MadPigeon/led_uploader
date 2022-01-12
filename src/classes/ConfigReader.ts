import * as path from "path";

export interface AgentConfig {
  api_id: number;
  api_hash: string;
  chat_id: number;
}

const config_path = path.join(process.cwd(), './config/app_config.json');
const agent_config_path = path.join(process.cwd(), './config/agent_config.json');

let configObject = undefined;
let agentConfigObject: AgentConfig = undefined;

export function getConfig() {
  if (configObject == undefined) {
    configObject = readFileToJSON(config_path);
  }

  return configObject;
}

export function getAgentConfig(): AgentConfig {
  if (agentConfigObject == undefined) {
    agentConfigObject = readFileToJSON(agent_config_path);
  }

  return agentConfigObject;
}

function readFileToJSON(file_path: string) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fs = require("fs");
  const rawdata = fs.readFileSync(file_path);
  return JSON.parse(rawdata);
}
