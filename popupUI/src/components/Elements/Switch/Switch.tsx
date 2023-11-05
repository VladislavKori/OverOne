import { Accessor, Setter, createEffect, createSignal } from 'solid-js'
import './Switch.scss'

export default function Switch({value, setter}: {
    value: Accessor<boolean>,
    setter: Setter<boolean>
}) {
    const [isActive, setIsActive] = createSignal<boolean>(false);

    createEffect(()=> {
        setIsActive(value())
    })

    const switchHandler = () => {
        setIsActive(!isActive())
        setter(isActive)
    }

    return (
        <div class="switch" onClick={switchHandler}>
            <div 
                class={isActive() ? "switch__point switch__point_active" : "switch__point"}
            />
        </div>
    )
}