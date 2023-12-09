import { Portal } from "solid-js/web"

import './Modal.scss'

import FastConnectionIcon from '../../assets/modal/fastc.svg'
import YourProxyIcon from '../../assets/modal/yprx.svg'

export default function Modal({ isOpen, closeModal, changePage }: { isOpen: any, closeModal: any, changePage: any }) {

    return (
        <Portal mount={document.getElementById('modal') as HTMLDivElement}>
            <div class={isOpen() ? "modal" : "modal modal_close"}>
                <div class="modal__overlay" onClick={() => closeModal()}>
                    <div class="modal__content">
                        <div class="modal__block" onClick={() => changePage("/list")}>
                            <img src={FastConnectionIcon} />
                            <h1 class="modal__title">Fast Connection</h1>
                            <p class="modal__description">This method use our list with proxy</p>
                        </div>
                        <div class="modal__block" onClick={() => changePage("/form")}>
                            <img src={YourProxyIcon} />
                            <h1 class="modal__title">Your proxy</h1>
                            <p class="modal__description">You use your proxy server for connection</p>
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    )
}