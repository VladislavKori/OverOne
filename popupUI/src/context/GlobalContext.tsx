import { createContext, createSignal } from "solid-js";

// types
import { TranspSettings } from "../types/TransportTypes";
import { IConnection, IInitialObject } from "../types/Contexts/GlobalContext";

// utils
import { TransportNode } from "../utils/Transport";
import { IContextProvider } from "../types/Context";

// Connection State
const [connectionState, updateConnectionState] = createSignal<IConnection>({
    connection: null,
    error: null,
})

// Settings State
const [settingsState, updateSettingsState] = createSignal<TranspSettings>({
    bypassList: [],
    incognito: false
})

// Transport code 
const transportManager = new TransportNode("hello");
transportManager.initListener({
    connectionState,
    updateConnectionState,
    settingsState, 
    updateSettingsState
})

// Initial object
const initialValue: IInitialObject = {
    connection: connectionState,
    settings: settingsState,
    methods: {
        getStatus: () => transportManager.getStatus,
        connect: (props) => transportManager.connection(props),
        disconnect: () => transportManager.disconnect(),
        resetSettings: () => {
            transportManager.disconnect();
            updateConnectionState({
                connection: null,
                error: null,
            });
        },
        setSettings: (props) => transportManager.setSettings(props),
        getSettings: () => transportManager.getSettigns()
    }
};

// Init context
const GlobalContext = createContext(initialValue);

export function ContextProvider(props: IContextProvider) {
    
    // first get status
    transportManager.getStatus()

    // get status every seconds
    setInterval(() => {
        transportManager.getStatus()
    }, 1000)

    return (
        <GlobalContext.Provider value={initialValue}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext };