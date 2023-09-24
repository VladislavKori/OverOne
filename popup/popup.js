const menuElement = document.querySelector('#menu');
const menuOpenElement = document.querySelector('#menuopen');
const menuCloseElement = document.querySelector('#closemenu');
const connectBtnElement = document.querySelector('#connect-btn');

// link
const linkToHomeScreen = document.querySelector('#linkto-homescreen');
const linkToFastConnectionScreen = document.querySelector('#linkto-fastconnectionscreen');
const linkToJSONConnectionScreen = document.querySelector('#linkto-jsonconnection');

// screen elements
const homeScreen = document.querySelector('#screen1');
const fastConnectionScreen = document.querySelector('#screen2');
const JSONConnectionScreen = document.querySelector('#screen3');

// info elements
const modeElement = document.querySelector('#type-connect');
const host = document.querySelector('#host');
const port = document.querySelector('#port');
const schema = document.querySelector('#schema');
const statusTextField = document.querySelector('#status');
const statusCircle = document.querySelector('#status-circle');

// fast connection elements
const fcHost = document.querySelector('#fc-host');
const fcPort = document.querySelector('#fc-port');
const fcSchema = document.querySelector('#fc-schema');
const fcConnect = document.querySelector('#fc-connect');

// json connection 
const jsonInputField = document.querySelector('#json-file');

// screens
const screens = [homeScreen, fastConnectionScreen, JSONConnectionScreen];

// satates
const connectionModes = {
    "SIMPLE": "Simple Connection",
    "FAST": "Fast Connection",
    "JSON": "JSON Connection"
}

const status = {
    "CONNECTED": "CONNECTED",
    "ERROR": "ERROR",
    "RECONNECT": "RECONNECT",
    "SEARCH": "SEARCH",
    "NO_CONNECT": "NO_CONNECT"
}

const statusColor = {
    "CONNECTED": "#00ff00",
    "ERROR": "#ff0000",
    "RECONNECT": "00ffff",
    "SEARCH": "SEARCH",
    "NO_CONNECT": "#e3e3e3"
}

const typeOfConnection = {
    "SIMPLE": "Simple Connect",
    "FAST": "Fast Connect",
    "JSON": "JSON Connect"
}

let currentStatus = status["NO_CONNECT"];

let connectionMode = null;

// menu
function closeMenu() {
    menuElement.style.left = '100%';
}

function openMenu() {
    menuElement.style.left = 0;
}

menuOpenElement.addEventListener('click', openMenu);
menuCloseElement.addEventListener('click', closeMenu);

linkToHomeScreen.addEventListener('click', _ => manageScreen(screens, 0))
linkToFastConnectionScreen.addEventListener('click', _ => manageScreen(screens, 1))
linkToJSONConnectionScreen.addEventListener('click', _ => manageScreen(screens, 2))

function manageScreen(screens, id) {
    let needScreen;
    if (screens.length - 1 < id) {
        needScreen = screens[0];
    } else {
        needScreen = screens[id];
    }

    linkToHomeScreen.classList.remove("menu-item_active")
    linkToFastConnectionScreen.classList.remove("menu-item_active")
    linkToJSONConnectionScreen.classList.remove("menu-item_active")
    switch (id) {
        case 0:
            linkToHomeScreen.classList.add("menu-item_active");
            break;
        case 1:
            linkToFastConnectionScreen.classList.add("menu-item_active");
            break;
        case 2:
            linkToJSONConnectionScreen.classList.add("menu-item_active");
            break;
    }

    screens.map(item => item.style.display = "none");
    needScreen.style.display = "flex";
    closeMenu();
}

// init first screen
manageScreen(screens, 0)

const getFCConfig = () => {
    const host = fcHost.value;
    const port = fcPort.value;
    const schema = fcSchema.value;

    if (host === "" ||
        port === "" ||
        schema === "") {
        return null;
    }

    return {
        host,
        port,
        schema: [schema]
    }
}

connectBtnElement.addEventListener('click', _ => {
    if (currentStatus === status["CONNECTED"]) setButtonState(status["DISCONNECT"])
    else setButtonState(status["CONNECTED"])
})

function setButtonState(toState) {
    if (toState === status["CONNECTED"]) {
        connectBtnElement.textContent = "Disconnect";
        connectBtnElement.classList.add('disconnect-btn');
    }

    if (toState === status["DISCONNECT"] || toState === status["NO_CONNECT"]) {
        connectBtnElement.textContent = "Connect";
        connectBtnElement.classList.remove('disconnect-btn')
    }

    if (toState === status["ERROR"]) {
        connectBtnElement.textContent = "Connect";
        connectBtnElement.classList.remove('disconnect-btn')
    }
}

const fastConnectionBtnState = () => {
    if (currentStatus === status["CONNECTED"] && connectionMode === connectionModes["FAST"]) {
        fcConnect.textContent = "Disconnect";
        fcConnect.classList.add('disconnect-btn');
    } else {
        fcConnect.textContent = "Connect";
        fcConnect.classList.remove('disconnect-btn')
    }
}

const updateStatusField = (status) => {
    currentStatus = status;
    statusTextField.textContent = currentStatus;
    statusCircle.style.background = statusColor[currentStatus];
    modeElement.textContent = connectionMode === null ? "..." : connectionMode;
}

const updateConnectionInfoFields = (connection) => {
    if (connection === undefined) {
        host.textContent = "...";
        port.textContent = "...";
        schema.textContent = "...";
    }

    host.textContent = connection.host;
    port.textContent = connection.port;
    schema.textContent = connection.scheme;
}

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
    updateStatusField(currentStatus);
    setButtonState(currentStatus)

    // handlers for btns
    connectBtnElement.addEventListener('click', _ => {
        if (currentStatus === status["CONNECTED"]) {
            port.postMessage({
                command: "disconnect"
            });
            connectionMode = null;
        } else {
            port.postMessage({
                command: "connect",
            });
            connectionMode = connectionModes["SIMPLE"]
        };
    })

    fcConnect.addEventListener('click', _ => {
        const connectionConfig = getFCConfig();
        if (connectionConfig === null) {
            console.warn('fc-error');
            return false;
        };

        if (currentStatus === status["CONNECTED"] && connectionMode === connectionModes["FAST"]) {
            port.postMessage({
                command: "disconnect"
            });
            connectionMode = null;
        } else {
            port.postMessage({
                command: "fc-connect",
                connectionConfig
            })
            connectionMode = connectionModes["FAST"]
        }
    })

    jsonInputField.addEventListener('change', e => {
        const file = jsonInputField.files[0];

        if (file.type !== "application/json") return false;

        var reader = new FileReader();
        reader.onload = function (e) {
            const proxysList = JSON.parse(e.target.result);
            if ("proxys" in proxysList) {
                port.postMessage({
                    command: "json-connect",
                    data: proxysList
                })
                connectionMode = connectionModes["JSON"]
            }
        };
        reader.readAsText(file);
    })

    // listener
    port.onMessage.addListener(function (msg) {
        if (msg.command === "state") {
            updateStatusField(msg.status)
            updateConnectionInfoFields(msg.connection)
            setButtonState(currentStatus)
            fastConnectionBtnState()
        }

        if (msg.command === "error") {
            connectionMode = null
            setButtonState(status["ERROR"])
            updateStatusField(msg.status)
            updateConnectionInfoFields()
        }
    });

}
init()