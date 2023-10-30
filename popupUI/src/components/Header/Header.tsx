import './Header.scss'
import Logo from '../../assets/logo.svg'

export default function Header() {
    return (
        <header class="header">
            <div class="logo">
                <a class="logo__link" target="_blank" href="https://github.com/VladislavKori/OverOne">
                    <img src={Logo} />
                </a>
            </div>
        </header>
    )
}