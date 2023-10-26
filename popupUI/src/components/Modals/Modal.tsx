import { Portal } from "solid-js/web"

import './Modal.scss'

export default function Modal() {
    return (
        <Portal mount={document.getElementById('modal') as HTMLDivElement}>
            <div class="modal__overlay">
                <div class="modal__content">

                </div>
            </div>
        </Portal>
    )
}