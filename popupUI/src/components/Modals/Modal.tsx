import { Portal } from "solid-js/web"

import './Modal.scss'

import FastConnectionIcon from '../../assets/modal/fastc.svg'

export default function Modal({isOpen, closeModal}: {isOpen: any, closeModal: any}) {

    console.log(isOpen())
    return (
        <Portal mount={document.getElementById('modal') as HTMLDivElement}>
            <div class={isOpen() ? "modal" : "modal modal_close"}>
                <div class="modal__overlay" onClick={() => closeModal()}>
                    <div class="modal__content">
                        <div class="modal__block">
                            <img src={FastConnectionIcon} />
                            <h1 class="modal__title">Fast Connection</h1>
                            <p class="modal__description">This method use our list with proxy</p>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}