import { For } from "solid-js";

import './List.scss'

import proxysList from "./data";

// const fetchProxys = async () =>
//     (await fetch("http://localhost:3000/")).json()

export default function List({changePage}: { changePage: any }) {

    // const [] = createResource(fetchProxys);

    function connectProxy(_data: any) {
        changePage("/");
    }

    return (
        <div class="list">
            <For each={proxysList}>
                {(proxy) => (
                    <button
                        class="list__button"
                        onClick={() => connectProxy(proxy)}
                    >
                        <div class="list__flag">

                        </div>
                        <div class="list__info">
                            <h2 class="list__title">{proxy.country}</h2>
                            <p class="list__text">
                                {proxy.schema + " | " + proxy.ip + " | " + proxy.port}
                            </p>
                        </div>
                    </button>
                )}
            </For>
        </div>
    );
};