import { For, createResource, useContext } from "solid-js";

import './List.scss'

import ReturnIcon from '../../assets/icons/return.svg'

import { GlobalContext } from "../../context/GlobalContext";
import { RouterContext } from "../../context/RouterContext";
import { TranspConnection } from "../../types/TransportTypes";

const fetchProxys = async () =>
    (await fetch(`https://gitlab.com/VladislavKori/proxyslist/-/raw/main/proxys.json`)).json();

export default function List() {
    const data = useContext(GlobalContext);
    const routerCtx = useContext(RouterContext);

    const [proxys] = createResource<Array<TranspConnection>>(fetchProxys);

    function connectProxy(_data: any) {
        data.methods?.connect({
            host: _data.host,
            port: _data.port,
            scheme: _data.scheme
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
            <main class="list__content">
                {proxys.loading ? (
                    <p class="list__loading">Loading...</p>
                ) : (
                    <ul class="list__proxys">
                        <For each={proxys()}>
                            {(proxy) => (
                                <button
                                    class="list__button"
                                    onClick={() => connectProxy(proxy)}
                                >
                                    <div class="list__flag">

                                    </div>
                                    <div class="list__info">
                                        <h2 class="list__title">Country None</h2>
                                        <p class="list__text">
                                            {proxy.scheme + " | " + proxy.host + " | " + proxy.port}
                                        </p>
                                    </div>
                                </button>
                            )}
                        </For>
                    </ul>
                )}
            </main>
        </div>
    );
};