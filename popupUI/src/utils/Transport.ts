// types
import { TranspConnection, IMessage, IListener, TranspSettings } from "../types/TransportTypes";

export class TransportNode {
    private port: null | chrome.runtime.Port;

    constructor(portName?: string) {
        this.port = chrome.runtime.connect({ name: portName });
    }

    initListener({
        connectionState,
        updateConnectionState,
        settingsState,
        updateSettingsState
    }: IListener): (undefined | Error) {

        if (this.port === null) { return new Error("port not initialize") }

        this.port.onMessage.addListener((msg: IMessage) => {
            if (msg.command === "state") {
                updateConnectionState({ ...connectionState(), ...msg.data })
            }

            if (msg.command === "settings") {
                updateSettingsState({ ...settingsState(), ...msg.data })
            }
        });
    }

    public getStatus(): (void | Error) {
        if (this.port === null) { return new Error("port not initialize") }

        this.port.postMessage({
            command: "getStatus"
        })
    }

    public connection({ host, port, scheme }: TranspConnection): (void | Error) {
        if (this.port === null) { return new Error("port not initialize") }

        this.port.postMessage({
            command: "connect",
            data: {
                host: host,
                port: port,
                schema: scheme
            }
        })
    }

    public disconnect(): (void | Error) {
        if (this.port === null) { return new Error("port not initialize") }

        this.port.postMessage({
            command: "disconnect"
        })
    }

    public setSettings(settings: TranspSettings): (void | Error) {
        if (this.port === null) { return new Error("port not initialize") }

        this.port.postMessage({
            command: "setSettings",
            data: {
                bypassList: settings.bypassList,
                incognito: settings.incognito
            }
        })
    }

    public getSettigns(): (void | Error) {
        if (this.port === null) { return new Error("port not initialize") }

        this.port.postMessage({
            command: "getSettings"
        })
    }
}