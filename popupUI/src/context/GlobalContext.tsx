import { Accessor, JSX, createContext, createSignal } from "solid-js";
import { TranspConnection, TranspError } from "../types/TransportTypes";
import { TransportNode } from "../access/Action";

export interface IInitialValue {
    state: Accessor<{
        connection: null | TranspConnection
        error: null | TranspError
    }> | null,
    methods: null | {
        getStatus: () => void
        connect: (data: TranspConnection) => void
        disconnect: () => void
        resetSettings: () => void
    }
}

const initialValue: IInitialValue = {
    state: null,
    methods: null
};

const GlobalContext = createContext(initialValue);

interface IContextProvider {
    children?: JSX.Element
}

export function ContextProvider(props: IContextProvider) {

    const [state, updateState] = createSignal({
        connection: null,
        error: null,
    })

    // transport code 
    const transportManager = new TransportNode("hello");
    transportManager.initListener(state, updateState)
    transportManager.getStatus()

    setInterval(() => {
        transportManager.getStatus()
    }, 1000)

    let store = {
        state,
        methods: {
            getStatus: transportManager.getStatus,
            connect: (props: TranspConnection) => transportManager.connection(props),
            disconnect: () => transportManager.disconnect(),
            resetSettings: () => {
                transportManager.disconnect();
                updateState({
                    connection: null,
                    error: null,
                });
            }
        }
    }

    return (
        <GlobalContext.Provider value={store}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export {
    GlobalContext
}