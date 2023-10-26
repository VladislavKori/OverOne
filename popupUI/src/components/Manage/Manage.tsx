import './Manage.scss'

import Settings from '../../assets/settings.svg'
import { createSignal } from 'solid-js'
import Modal from '../Modals/Modal';

export default function Manage({setSettings}: {setSettings: any}) {

    const [isOpen, setIsOpen] = createSignal<boolean>(false);
    
    const modalHandler = () => {
        setIsOpen(!isOpen());
    }

    return (
        <>
            <div class="manage">
                <button onClick={modalHandler} class="manage__button">Connect</button>
                <button class="manage__settings" onClick={() => setSettings("/settings")}>
                    <img src={Settings} />
                </button>
            </div>
            <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
        </>
    )
}