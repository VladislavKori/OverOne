### Background system of my proxy

methods
- "connect" - connect to proxy with {shema: schemaInterface, ip: string, port: string | number, settings?: any}
- "disconnect" - disconnected without somthing data
- "getStatus" -  return status of connection to proxy
- "getSettings" 
- "setSettings" - {bypassList: Array<string>, warrnings: boolean, incognito: boolean}