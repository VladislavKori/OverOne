import { Setter } from "solid-js";
import { TranspConnection, TranspData } from "../types/TransportTypes";

interface IMessage {
    command: string
    data: TranspData
}

export class TransportNode {
    private port: null | chrome.runtime.Port;

    constructor(portName?: string) {
        this.port = chrome.runtime.connect({ name: portName });
    }

    initListener(store: any, updateStore: Setter<{
        connection: null;
        error: null;
    }>) {

        if (this.port === null) { return new Error("port not initialize") }

        this.port.onMessage.addListener((msg: IMessage) => {
            if (msg.command === "state") {
                updateStore({ ...store(), ...msg.data })
            }

            if (msg.command === "error") {
                updateStore({ ...store(), ...msg.data})
            }
        });
    }

    public getStatus(): (void | Error) {
        if (this.port === null) { return new Error("port not initialize") }

        this.port?.postMessage({
            command: "getStatus"
        })
    }

    public connection({host, port, scheme}: TranspConnection): (void | Error) {
        if (this.port === null) { return new Error("port not initialize") }

        this.port?.postMessage({
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

        this.port?.postMessage({
            command: "disconnect"
        })
    }
}