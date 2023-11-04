import './Manage.scss'

import Settings from '../../assets/settings.svg'
import { createEffect, createSignal, useContext } from 'solid-js'
import Modal from '../Modals/Modal';
import { GlobalContext } from '../../context/GlobalContext';
import { TranspConnection, TranspError } from '../../types/TransportTypes';

export default function Manage({ changePage }: { changePage: any }) {

    const [state, setState] = createSignal<number>(0);
    const info = useContext(GlobalContext)

    const [isOpen, setIsOpen] = createSignal<boolean>(false);

    const modalHandler = () => {
        switch(state()) {
            case 0: 
                setIsOpen(!isOpen());
                break;
            case 1: 
                info.methods?.disconnect()
                break;
            case 2: 
                info.methods?.resetSettings()
                break;
        }
    }

    type dataType = {
        connection: null | TranspConnection
        error: null | TranspError
    }

    let data: null | dataType = null;

    createEffect(() => {
        data = info.state !== null ? info.state() : null;

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
                <button class="manage__settings" onClick={() => changePage("/settings")}>
                    <img src={Settings} />
                </button>
            </div>
            <Modal
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                changePage={() => changePage("/list")}
            />
        </>
    )
}