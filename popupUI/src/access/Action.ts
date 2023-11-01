import { Setter } from "solid-js";
import { TranspConnection } from "../types/TransportTypes";

interface IMessage {
    command: string
    data: null | {
        connection: TranspConnection
    }
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
                updateStore({ ...store(), connection: true })
            }
        });
    }

    public getStatus(): (void | Error) {
        if (this.port === null) { return new Error("port not initialize") }

        this.port?.postMessage({
            command: "getStatus"
        })
    }
}