import './Error.scss'
import Err from '../../assets/smiles/err.svg';

const ErrorBoundaryHandler = (err: Error) => {
    console.log(err)
    return <ErrorComponent />
}

function ErrorComponent() {

    const reloadHandler = () => {
        window.location.reload()
    }

    return (
        <div class="error">
            <div class="error__flex">
                <img src={Err} />
                <p class="error__text">Opss, error....</p>
            </div>
            <button
                onClick={reloadHandler}
                class="error__button">
                Reload
            </button>
        </div>
    )
}

export default ErrorBoundaryHandler