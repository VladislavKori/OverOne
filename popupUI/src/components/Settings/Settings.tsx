import './Settings.scss'

import ReturnIcon from '../../assets/icons/return.svg'
import Switch from '../Elements/Switch/Switch'

export default function Settings({ changePage }: { changePage: any }) {
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
                    />
                </div>

                <div class="settings__block settings__block_horizontal">
                    <div class="settings__text-block">
                        <h2 class="settings__title">Warrnings</h2>
                        <h3 class="settings__subtitle">Останавливать загрузку сайта при отключённом состоянии</h3>
                    </div>
                    <div class="settings__switch">
                        <Switch />
                    </div>
                </div>

                <div class="settings__block settings__block_horizontal">
                    <div class="settings__text-block">
                        <h2 class="settings__title">Incognito</h2>
                        <h3 class="settings__subtitle">Work in incognito</h3>
                    </div>
                    <div class="settings__switch">
                        <Switch />
                    </div>
                </div>
            </div>
            <div class="settings__manage">
                <button class="settings__manage-btn">Save</button>
            </div>
        </div>
    )
}