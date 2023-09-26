import {
    status,
    typeOfConnection
} from "./states.js";
import {
    connect,
    disconnect,
    getSettings
} from "./manage.js";

let connectionMode = null;

chrome.runtime.onConnect.addListener(port => {
    try {
        // handlers 
        port.onMessage.addListener(async function (msg) {
            // connect handler
            if (msg.command === "simple-connect") {

                connectionMode = typeOfConnection["SIMPLE"];
                await connect(msg.data);
                const info = await getSettings();

                const response = {
                    status: status["CONNECTED"],
                    command: "state",
                    connection: info,
                    connectionMode
                }
                port.postMessage(response);
            }

            // disconect handler
            if (msg.command === "disconnect") {

                connectionMode = null;
                disconnect();
                const info = await getSettings();

                const response = {
                    status: status["NO_CONNECT"],
                    command: "state",
                    connection: info,
                    connectionMode
                }
                port.postMessage(response);
            }

            // fc-connect 
            if (msg.command === "fc-connect") {

                connectionMode = typeOfConnection["FAST"];
                await connect(msg.connectionConfig);
                const info = await getSettings();

                port.postMessage({
                    command: "state",
                    status: status["CONNECTED"],
                    connection: info,
                    connectionMode
                });
            }

            // json-connect
            // if (msg.command === "json-connect") {
            //     await connect("json", msg.data);
            //     const info = await getSettings();
            //     saveInStorage();

            //     port.postMessage({
            //         command: "state",
            //         status: status["CONNECTED"],
            //         connection: {
            //             host: info.host,
            //             port: info.port,
            //             scheme: info.scheme
            //         }
            //     });
            // }

            // get status handler
            if (msg.command === "getStatus") {
                const info = await getSettings();

                port.postMessage({
                    command: "state",
                    status: info === null ? status["NO_CONNECT"] : status["CONNECTED"],
                    connection: info,
                    connectionMode
                });
            }
        });

        // Error handler. It's disconect not work proxy and send status to popup window
        chrome.proxy.onProxyError.addListener(details => {
            if (details.fatal) {
                connectionMode = null
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
            connectionMode = null;
            port.postMessage({
                command: "error",
                status: status["ERROR"],
                error: error
            })
        }
    }
});