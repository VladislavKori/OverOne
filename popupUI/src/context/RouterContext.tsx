import { createContext, createSignal } from "solid-js"

// types
import { IContextProvider } from "../types/Context";

const [route, setRoute] = createSignal<string>("/");

let initialValue = {
    getRoute: route,
    setRoute: setRoute
}

const RouterContext = createContext(initialValue);

export function RouterCTXProvider(props: IContextProvider) {

    let store = {
        getRoute: route,
        setRoute: setRoute
    }

    return (
        <RouterContext.Provider value={store}>
            {props.children}
        </RouterContext.Provider>
    )
}

export { RouterContext }