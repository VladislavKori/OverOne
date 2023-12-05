import { For, createResource, useContext } from "solid-js";

import './List.scss'

import ReturnIcon from '../../assets/icons/return.svg'

import { GlobalContext } from "../../context/GlobalContext";
import { RouterContext } from "../../context/RouterContext";
import { TranspSchema } from "../../types/TransportTypes";

const fetchProxys = async () =>
    (await fetch(`http://localhost:8080/parsing/getproxys`)).json();


export default function List() {
    const [proxysList] = createResource<Array<{
        id: number
        host: string
        port: number | string
        schem: TranspSchema
    }>>(fetchProxys);

    const data = useContext(GlobalContext);
    const routerCtx = useContext(RouterContext);

    function connectProxy(_data: any) {
        data.methods?.connect({
            host: _data.host,
            port: _data.port,
            scheme: "http"

            // scheme: _data.schem
        });
        routerCtx.setRoute("/");
    }

    return (
        <div class="list">
            <header class="list__header">
                <button
                    class="list__btn-to-previous"
                    onClick={() => routerCtx.setRoute("/")}
                >
                    <img src={ReturnIcon} alt="return-icon" />
                    <p>List</p>
                </button>
            </header>
            <ul class="list__proxys">
                {proxysList.loading ? <p style={{ color: "#fff" }}>Loading...</p> : (
                    <For each={proxysList()}>
                        {(proxy) => (
                            <button
                                class="list__button"
                                onClick={() => connectProxy(proxy)}
                            >
                                <div class="list__flag">

                                </div>
                                <div class="list__info">
                                    <h2 class="list__title">Contry</h2>
                                    <p class="list__text">
                                        {proxy.schem + " | " + proxy.host + " | " + proxy.port}
                                    </p>
                                </div>
                            </button>
                        )}
                    </For>
                )}
            </ul>
        </div>
    );
};