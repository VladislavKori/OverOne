import './Manage.scss'

import Settings from '../../assets/settings.svg'

export default function Manage() {
    return (
        <div class="manage">
            <button class="manage__button">Connect</button>
            <button class="manage__settings">
                <img src={Settings} />
            </button>
        </div>
    )
}