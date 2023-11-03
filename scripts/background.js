import { status } from "./states.js";
import {
    connect,
    disconnect,
    getStatus
} from "./manage.js";

chrome.runtime.onConnect.addListener(port => {
    try {
        // handlers 
        port.onMessage.addListener(async function (msg) {
            // connect handler
            if (msg.command === "connect") {
                
                const {success} = connect(msg.data);
                const info = getStatus();

                const response = {
                    status: status["CONNECTED"],
                    command: "state",
                    connection: info,
                }
                port.postMessage(response);
            }

            // disconect handler
            if (msg.command === "disconnect") {
                disconnect();
                const info = getStatus();

                const response = {
                    status: status["NO_CONNECT"],
                    command: "state",
                    connection: info,
                }
                port.postMessage(response);
            }

            // get status handler
            if (msg.command === "getStatus") {
                const info = getStatus();
                console.log(info);

                port.postMessage({
                    command: "state",
                    status: info === null ? status["NO_CONNECT"] : status["CONNECTED"],
                    connection: info,
                });
            }

            // set settings
            if (msg.command === "setSettings") {

            }

            // get settings
            if (msg.command === "getSettings") {

            }
        });

        // Error handler. It's disconect not work proxy and send status to popup window
        chrome.proxy.onProxyError.addListener(details => {
            if (details.fatal) {
                disconnect()
                port.postMessage({
                    command: "error",
                    status: status["ERROR"],
                    error: details
                })
            }
        })

    } catch (error) {
        // send error
        if (error) {
            console.error(error, 'error');
            port.postMessage({
                command: "error",
                status: status["ERROR"],
                error: error
            })
        }
    }
});