import './Manage.scss'

import Settings from '../../assets/settings.svg'
import { createEffect, createSignal, useContext } from 'solid-js'
import Modal from '../Modals/Modal';
import { GlobalContext } from '../../context/GlobalContext';
import { RouterContext } from '../../context/RouterContext';

export default function Manage() {
    const info = useContext(GlobalContext)
    const routerCtx = useContext(RouterContext)

    const [state, setState] = createSignal<number>(0);

    const [isOpen, setIsOpen] = createSignal<boolean>(false);

    const modalHandler = () => {
        switch(state()) {
            case 0: 
                setIsOpen(!isOpen());
                break;
            case 1: 
                info.methods.disconnect()
                break;
            case 2: 
                info.methods.resetSettings()
                break;
        }
    }

    createEffect(() => {
        const data = info.connection();
        if (data === null || data.connection === null) { setState(0) }
        else if (data.connection !== null && data.error === null) { setState(1) }
        else if (data.error !== null) { setState(2) }
    })

    return (
        <>
            <div class="manage">
                <button onClick={modalHandler} class={"manage__button" + " " + `manage__button${state()}`}>
                    {state() === 0 ? "Connect" : null}
                    {state() === 1 ? "Disconnect" : null}
                    {state() === 2 ? "Reconnect" : null}
                </button>
                <button class="manage__settings" onClick={() => routerCtx.setRoute("/settings")}>
                    <img src={Settings} />
                </button>
            </div>
            <Modal
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                changePage={() => routerCtx.setRoute("/list")}
            />
        </>
    )
}