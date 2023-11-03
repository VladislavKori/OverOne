import './Manage.scss'

import Settings from '../../assets/settings.svg'
import { createSignal, useContext } from 'solid-js'
import Modal from '../Modals/Modal';
import { GlobalContext } from '../../context/GlobalContext';

export default function Manage({ changePage }: { changePage: any }) {

    const [isOpen, setIsOpen] = createSignal<boolean>(false);

    const data = useContext(GlobalContext)

    const modalHandler = () => {
        // setIsOpen(!isOpen());
        if (data.state !== null) {
            console.log(data, data.state())
        }
    }

    return (
        <>
            <div class="manage">
                <button onClick={modalHandler} class="manage__button">Connect</button>
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