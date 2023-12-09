import { createSignal, useContext } from 'solid-js'

import './Form.scss'

import ReturnIcon from '../../assets/icons/return.svg'


import { TranspSchema } from '../../types/TransportTypes'
import { GlobalContext } from '../../context/GlobalContext';
import { RouterContext } from '../../context/RouterContext';

const Form = () => {

    const data = useContext(GlobalContext);
    const routerCtx = useContext(RouterContext);

    const [ip, setIp] = createSignal<string>("")
    const [port, setPort] = createSignal<string>("")
    const [schema, setSchema] = createSignal<TranspSchema>("http")

    function connectProxy() {
        data.methods?.connect({
            host: ip(),
            port: port(),
            scheme: schema()
        });
        routerCtx.setRoute("/");
    }

    return (
        <div class="form">
            <header class="form__header">
                <button
                    class="form__btn-to-previous"
                    onClick={() => routerCtx.setRoute("/")}
                >
                    <img src={ReturnIcon} alt="return-icon" />
                    <p>Form</p>
                </button>
            </header>

            <div class="form__input-block">
                <label class="form__label">IP adress</label>
                <input
                    type="text"
                    class="form__input"
                    placeholder='Write IP adress'
                    value={ip()}
                    onInput={e => setIp(e.target.value)}
                />
            </div>

            <div class="form__input-block">
                <label class="form__label">Port</label>
                <input
                    type="text"
                    class="form__input"
                    placeholder='Write Port'
                    value={port()}
                    onInput={e => setPort(e.target.value)}
                />
            </div>

            <div class="form__input-block">
                <label class="form__label">Schema</label>
                <select
                    class="form__input"
                    value={schema()}
                    onChange={e => setSchema(e.currentTarget.value as TranspSchema)}
                >
                    <option value="http">http</option>
                    <option value="https">https</option>
                    <option value="socks4">socks4</option>
                    <option value="socks5">socks5</option>
                </select>
            </div>

            <button
                class="form__button"
                onClick={() => connectProxy()}
            >
                Next
            </button>

            {/* <div class="form__history">
                ....
            </div> */}

        </div>
    )
}

export default Form