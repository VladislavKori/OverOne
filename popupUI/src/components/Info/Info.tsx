import { createEffect, createSignal, useContext } from 'solid-js';

// styles
import './Info.scss'

// icons
import Conn from '../../assets/smiles/conn.svg';
import Noc from '../../assets/smiles/noc.svg';
import Err from '../../assets/smiles/err.svg';

// utils
import { GlobalContext } from '../../context/GlobalContext';

export default function Info() {

    const info = useContext(GlobalContext);

    const [state, setState] = createSignal<number>(0);
    const [connectionString, setConnectionString] = createSignal<string>("");
    const [isCopy, setIsCopy] = createSignal<boolean>(false)

    createEffect(() => {
        const data = info.connection();
        if (data === null || data.connection === null || data.connection.scheme === null) { setState(0) }
        else if (data.connection !== null && data.error === null ) { 
            setState(1);
            setConnectionString(`${data.connection.scheme} | ${data.connection.host}:${data.connection.port}`);
         }
        else if (data.error !== null ) { setState(2) }
    })

    const copyConnectionString = () => {
        if (state() === 1) {
            window.navigator.clipboard.writeText(connectionString());

            setIsCopy(true)
            setInterval(() => {
                setIsCopy(false)
            }, 2000)
        }
    }

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
                <div 
                    onClick={copyConnectionString} 
                    class={"info__screen" + 
                        " " + `info__screen-${state()}` 
                        + " " + (isCopy() ? "info__screen-copyed" : null )  }
                >
                    {state() === 0 ? "wait connection...." : null}
                    {state() === 1 ? (
                        <>
                            <p>{isCopy() ? "Copied" : connectionString()}</p>
                        </>
                    ) : null}
                    {state() === 2 ? `Try to recconnect` : null}
                </div>
            </div>
        </div>
    )
} 