import './Info.scss'

// icons
import Conn from '../../assets/smiles/conn.svg';
import Noc from '../../assets/smiles/noc.svg';
import Err from '../../assets/smiles/err.svg';

import { createSignal, useContext } from 'solid-js';
import { GlobalContext } from '../../context/GlobalContext';

export default function Info() {

    const [state, setState] = createSignal<number>(0);
    const info = useContext(GlobalContext);

    const data = info.state !== null ? info.state() : null;

    if (data === null) { setState(0) }
    else if (data.connection !== null) { setState(1) }
    else if (data.error) { setState(2) }

    return (
        <div class="info">
            <div class={"info__circle" + " " + `info__circle-state${state()}`}>
                <div class="info__circle-inner">
                    {state() === 0 ? <img src={Noc} /> : null}
                    {state() === 1 ? <img src={Conn} /> : null}
                    {state() === 2 ? <img src={Err} /> : null}
                </div>
            </div>
            <div class="info__status">
                <p class="info__status-text">
                    Status: <span class="info__status_blue">
                        {state() === 0 ? "No Connected" : null}
                        {state() === 1 ? "Connected" : null}
                        {state() === 2 ? "Error" : null}
                    </span>
                </p>
                <div class={"info__screen" + " " + `info__screen-${state()}`}>
                    {state() === 0 ? "wait connection...." : null}
                    {state() === 1 ? `${data?.connection?.schema} | ${data?.connection?.host}:${data?.connection?.port}` : null}
                    {state() === 2 ? `Try to recconnect` : null}
                </div>
            </div>
        </div>
    )
} 