import './Info.scss'

// icons
import Conn from '../../assets/smiles/conn.svg';

export default function Info() {

    const status: string = "No Connected"

    return (
        <div class="info">
            <div class="info__circle">
                <div class="info__circle-inner">
                    <img src={Conn} />
                </div>
            </div>
            <div class="info__status">
                <p class="info__status-text">
                    Status: <span class="info__status_blue">{status}</span>
                </p>
                <div class="info__screen">
                    wait connection....
                </div>
            </div>
        </div>
    )
} 