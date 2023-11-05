import { status } from "./states.js";
import {
    connect,
    disconnect,
    getStatus
} from "./manage.js";

let settings = {
    bypassList: [],
    incognito: false
}

chrome.runtime.onConnect.addListener(function (port) {
    let errorState = false;
    // listener with handlers 
    port.onMessage.addListener(async function (msg) {
        // connect handler
        if (msg.command === "connect") {
            connect({...msg.data, settings});
            const info = await getStatus();

            const response = {
                command: "state",
                data: {
                    connection: info,
                    error: null
                }
            }
            port.postMessage(response);
        }

        // disconect handler
        if (msg.command === "disconnect") {
            errorState = false;
            disconnect()

            const response = {
                command: "state",
                data: {
                    connection: null,
                    error: null
                }
            }
            port.postMessage(response);
        }

        // get status handler
        if (msg.command === "getStatus") {
            const info = await getStatus();
            let response = {
                command: errorState ? "error" : "state",
                data: {
                    connection: info,
                    error: errorState ? {
                        info: "Vau"
                    } : null
                }
            }

            port.postMessage(response);
        }

        // set settings
        if (msg.command === "setSettings") {
            settings = msg.data;
            console.log("settings set: ", settings)
            port.postMessage({
                command: "settings",
                data: settings
            });
        }

        // get settings
        if (msg.command === "getSettings") {
            console.log("get settings: ", settings)
            port.postMessage({
                command: "settings",
                data: settings
            });
        }
    });

    // Error handler. It's disconect not work proxy and send status to popup window
    chrome.proxy.onProxyError.addListener(details => {
        console.log(details)
        if (details.fatal && !errorState) {
            return errorState = true;
        }
    })
});

