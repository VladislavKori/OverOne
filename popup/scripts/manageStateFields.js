import {
    statusColor
} from "./states.js";

// info elements
const modeElement = document.querySelector('#type-connect');
const host = document.querySelector('#host');
const port = document.querySelector('#port');
const schema = document.querySelector('#schema');
const statusTextField = document.querySelector('#status');
const statusCircle = document.querySelector('#status-circle');

const updateStatusField = (status) => {
    console.log(status)
    statusTextField.textContent = status;
    statusCircle.style.background = statusColor[status];
}

const updateConnectionInfoFields = (status, connection, connectionMode) => {
    if (connection === null || connection === undefined) {
        host.textContent = "...";
        port.textContent = "...";
        schema.textContent = "...";
    } else {
        host.textContent = connection.host;
        port.textContent = connection.port;
        schema.textContent = connection.scheme;
    }

    if (connectionMode === null || connectionMode === undefined) {
        modeElement.textContent = "..."
    } else {
        modeElement.textContent = connectionMode;
    }

    updateStatusField(status)
}

export {
    updateStatusField,
    updateConnectionInfoFields
}