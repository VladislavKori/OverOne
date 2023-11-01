import { Accessor, JSX, createContext, createSignal } from "solid-js";
import { TranspConnection, TranspError } from "../types/TransportTypes";
import { TransportNode } from "../access/Action";

interface IInitialValue {
    state: Accessor<{
        connection: null | TranspConnection
        error: null | TranspError
    }> | null
    static: null | string
}

const initialValue: IInitialValue = {
    state: null,
    static: null
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

    const store = {
        state,
        static: "jwe"
    }

    // transport code 
    const transportManager = new TransportNode("hello");
    transportManager.initListener(state, updateState)
    transportManager.getStatus()

    return (
        <GlobalContext.Provider value={store}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export {
    GlobalContext
}