const chosewindowElement = document.querySelector('#chosewindow');

const fetchProxyList = async () => {
    const result = await fetch('https://gitlab.com/VladislavKori/proxyslist/-/raw/master/proxys.json?ref_type=heads')
        .then(resp => resp.json())
    return result;
}

function createItemForProxyList(data) {
    const divElement = document.createElement('div');
    const p1Element = document.createElement('p');
    const p2Element = document.createElement('p');
    const p3Element = document.createElement('p');

    p1Element.textContent = `HOST: ${data.host}`
    p2Element.textContent = `PORT: ${data.port}`
    p3Element.textContent = `SCHEMA: ${data.schema}`

    divElement.classList.add("chosewindow__item");

    divElement.appendChild(p1Element)
    divElement.appendChild(p2Element)
    divElement.appendChild(p3Element)
    chosewindowElement.appendChild(divElement);
    
    return divElement;
}

function removeAllItmes() {
    while(chosewindowElement.firstChild) {
        chosewindowElement.removeChild(chosewindowElement.firstChild);
    }
}

function openChoseWindow() {
    chosewindowElement.style.left = '0%';
}

function closeChoseWindow() {
    chosewindowElement.style.left = '100%';
}

export const choseProxysFromList = async (port) => {
    const proxys = (await fetchProxyList()).proxys;
    if (proxys.length < 0) return null;

    removeAllItmes()
    openChoseWindow();

    // generate items
    proxys.map(item => { 
        const element = createItemForProxyList(item);
        element.addEventListener('click', _ => {

            // item = {host: string, port: number, schma: Array<string>}
            port.postMessage({ command: "simple-connect", data: item });
            closeChoseWindow();
        })
    })
}