import { For, useContext } from "solid-js";

import './List.scss'

import proxysList from "./data";

import ReturnIcon from '../../assets/icons/return.svg'

import { GlobalContext } from "../../context/GlobalContext";
import { RouterContext } from "../../context/RouterContext";

export default function List() {

    const data = useContext(GlobalContext);
    const routerCtx = useContext(RouterContext);

    function connectProxy(_data: any) {
        data.methods?.connect({
            host: _data.ip,
            port: _data.port,
            scheme: _data.schema
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
            </ul>
        </div>
    );
};