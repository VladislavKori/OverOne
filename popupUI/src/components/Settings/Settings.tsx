import './Settings.scss'

import ReturnIcon from '../../assets/icons/return.svg'
import Switch from '../Elements/Switch/Switch'
import { createEffect, createSignal, onMount, useContext } from 'solid-js'
import { GlobalContext } from '../../context/GlobalContext'

export default function Settings({ changePage }: { changePage: any }) {

    const data = useContext(GlobalContext);

    const [allSettingsApply, setAllSettingsApply] = createSignal<boolean>(false);
    const [bypassList, setBypassList] = createSignal<string>("");
    const [incognitoIsActive, setIncognitoActive] = createSignal<boolean>(false);

    function updateFileds(info: any) {
        console.log("from updated Fields: ", info)
        setBypassList(info.bypassList.join(", "));
        setIncognitoActive(info.incognito);
    }

    onMount(() => {
        data.methods?.getSettings();
    })

    createEffect(() => {
        if (data.settingsStore !== null) {
            let info = data.settingsStore();
            updateFileds(info)
        }
    })

    createEffect(() => {
        bypassList(); incognitoIsActive();
        setAllSettingsApply(false)
    })

    const settingsSaveHandler = () => {
        console.log("data near setter: ", {
            bypassList: bypassList().split(", "),
            incognito: incognitoIsActive()
        })
        data.methods?.setSettings({
            bypassList: bypassList().split(", "),
            incognito: incognitoIsActive()
        })
        setAllSettingsApply(true);
    }

    return (
        <div class="settings">
            <header class="settings__header">
                <button
                    class="settings__btn-to-previous"
                    onClick={() => changePage("/")}
                >
                    <img src={ReturnIcon} alt="return-icon" />
                    <p>Settings</p>
                </button>
            </header>
            <div class="settings__content">
                <div class="settings__block">
                    <div class="settings__text-block">
                        <h2 class="settings__title">Bypass list</h2>
                        <h3 class="settings__subtitle">Write sites with запятая</h3>
                    </div>
                    <textarea
                        class="settings__input"
                        style={{
                            width: "100%",
                            height: "100px",
                            resize: "none"
                        }}
                        placeholder="Write somthing..."
                        onInput={e => setBypassList(e.target.value)}
                        value={bypassList()}
                    />
                </div>
                
                <div class="settings__block settings__block_horizontal">
                    <div class="settings__text-block">
                        <h2 class="settings__title">Incognito</h2>
                        <h3 class="settings__subtitle">Work in incognito</h3>
                    </div>
                    <div class="settings__switch">
                        <Switch value={incognitoIsActive} setter={setIncognitoActive} />
                    </div>
                </div>
            </div>
            <div class="settings__manage">
                <button
                    class={"settings__manage-btn" + ` ${allSettingsApply() ? "settings__manage-btn_apply" : null}`}
                    onClick={settingsSaveHandler}
                >
                    Save
                </button>
            </div>
        </div>
    )
}