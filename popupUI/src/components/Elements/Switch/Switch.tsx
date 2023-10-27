import { createSignal } from 'solid-js'
import './Switch.scss'

export default function Switch() {

    const [isActive, setIsActive] = createSignal<boolean>(false);
    const switchHandler = () => {
        setIsActive(!isActive())
    }

    return (
        <div class="switch" onClick={switchHandler}>
            <div 
                class={isActive() ? "switch__point switch__point_active" : "switch__point"}
            />
        </div>
    )
}