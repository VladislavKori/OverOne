import { Accessor } from "solid-js"
import { TranspConnection, TranspError, TranspSettings } from "../../types/TransportTypes";

import { TranspConnection, TranspError } from "../../types/TransportTypes";

export interface IConnection {
    connection: null | TranspConnection,
    error: null | TranspError,
}

export interface IInitialObject {
    connection: Accessor<IConnection>,
    settings: Accessor<TranspSettings>,
    methods: {
        getStatus: () => void
        connect: (props: TranspConnection) => void
        disconnect: () => void
        resetSettings: () => void
        setSettings: (props: TranspSettings) => void
        getSettings: () => void
    }
}