// fast connection elements
const fcHost = document.querySelector('#fc-host');
const fcPort = document.querySelector('#fc-port');
const fcSchema = document.querySelector('#fc-schema');
const fcConnect = document.querySelector('#fc-connect');

export const getFCConfig = () => {
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

export const updateFastBtnState = (currentStatus, connectionMode) => {
    if (currentStatus === status["CONNECTED"] && connectionMode === connectionModes["FAST"]) {
        fcConnect.textContent = "Disconnect";
        fcConnect.classList.add('disconnect-btn');
    } else {
        fcConnect.textContent = "Connect";
        fcConnect.classList.remove('disconnect-btn')
    }
}