import { Accessor, JSX, createContext, createSignal } from "solid-js";
import { TranspConnection, TranspError, TranspSettings } from "../types/TransportTypes";
import { TransportNode } from "../access/Action";

export interface IInitialValue {
    state: Accessor<{
        connection: null | TranspConnection
        error: null | TranspError
    }> | null,
    settingsStore: Accessor<{
        bypassList: Array<string>,
        incognito: boolean
    }> | null,
    methods: null | {
        getStatus: () => void
        connect: (data: TranspConnection) => void
        disconnect: () => void
        resetSettings: () => void
        getSettings: () => void
        setSettings: (props: TranspSettings) => void
    }
}

const initialValue: IInitialValue = {
    state: null,
    settingsStore: null,
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

    const [settingsStore, updateSettings] = createSignal<{
        bypassList: Array<string>,
        incognito: boolean
    }>({
        bypassList: [],
        incognito: false
    })

    // transport code 
    const transportManager = new TransportNode("hello");
    transportManager.initListener(state, settingsStore, updateState, updateSettings)
    transportManager.getStatus()

    setInterval(() => {
        transportManager.getStatus()
    }, 1000)

    let store = {
        state,
        settingsStore,
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
            },
            setSettings: (props: TranspSettings) => transportManager.setSettings(props),
            getSettings: () => transportManager.getSettigns()
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