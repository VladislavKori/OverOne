import './scripts/screensManager.js'
import {
    updateConnectionInfoFields,
} from './scripts/manageStateFields.js';
import {
    status,
    connectionModes,
    statusColor,
    typeOfConnection
} from './scripts/states.js'
import {
    getFCConfig
} from './scripts/fastConnection.js';
import {
    choseProxysFromList
} from './scripts/getProxys.js';
import {
    updateFastBtnState
} from './scripts/fastConnection.js'
import {
    updateButtonState
} from './scripts/buttonsState.js';

const connectBtnElement = document.querySelector('#connect-btn');
const fcConnect = document.querySelector('#fc-connect');

// json connection 
// const jsonInputField = document.querySelector('#json-file');

let currentStatus = status["NO_CONNECT"];

let connectionMode = null;

function init() {

    // init port
    var port = chrome.runtime.connect({
        name: "helloworld"
    });

    // get initial status with connection object
    port.postMessage({
        command: "getStatus"
    })

    // set start fields
    updateButtonState(connectBtnElement, currentStatus)
    updateConnectionInfoFields(status, null, connectionMode)

    // handlers for btns
    // simple connection
    connectBtnElement.addEventListener('click', async _ => {
        if (currentStatus === status["CONNECTED"]) {
            port.postMessage({
                command: "disconnect"
            });
            connectionMode = null;
        }

        if (currentStatus === status["NO_CONNECT"] || currentStatus === status["ERROR"]) {
            const needProxy = await choseProxysFromList(port);
            connectionMode = connectionModes["SIMPLE"]
        };
    })

    fcConnect.addEventListener('click', _ => {

        if (currentStatus === status["CONNECTED"]) {
            port.postMessage({
                command: "disconnect"
            });
            connectionMode = null;
        }

        const connectionConfig = getFCConfig();
        if (connectionConfig === null) {
            console.error('fc-error');
            return false;
        };

        if (currentStatus === status["NO_CONNECT"] || currentStatus === status["ERROR"]) {
            port.postMessage({
                command: "fc-connect",
                connectionConfig
            })
            connectionMode = connectionModes["FAST"]
        };
    })

    // listener
    port.onMessage.addListener(function (msg) {
        if (msg.command === "state") {
            connectionMode = msg.connectionMode;
            currentStatus = msg.status;

            updateConnectionInfoFields(msg.status, msg.connection, connectionMode)

            // btns
            updateButtonState(connectBtnElement, msg.status, connectionMode)
            updateButtonState(fcConnect, msg.status, connectionMode)
        }

        if (msg.command === "error") {
            console.log(msg)
            connectionMode = null
            currentStatus = msg.status;

            updateConnectionInfoFields(msg.status, msg.connection, connectionMode)

            updateButtonState(connectBtnElement, msg.status, connectionMode)
            updateButtonState(fcConnect, msg.status, connectionMode)
        }
    });

}
init()