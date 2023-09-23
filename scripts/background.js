const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const status = {
    "CONNECTED": "CONNECTED",
    "ERROR": "ERROR",
    "RECONNECT": "RECONNECT",
    "SEARCH": "SEARCH",
    "NO_CONNECT": "NO_CONNECT"
}

const fetchProxyList = async () => {
    const result = await fetch('https://gitlab.com/VladislavKori/proxyslist/-/raw/master/proxys.json?ref_type=heads')
        .then(resp => resp.json())
    return result;
}

const generateConfig = async () => {
    const list = (await fetchProxyList()).proxys;
    const rNum = random(0, list.length - 1);
    const connection = list[rNum];

    const host = connection.ip;
    const scheme = connection.protocols[0];
    const port = Number(connection.port);

    var config = {
        mode: "fixed_servers",
        rules: {
            proxyForHttps: {
                scheme: scheme,
                host: host,
                port: port,
            },
            bypassList: [
                // "*.radiorecord.ru", // work pattern
                // "*.youtube.com"
            ]
        }
    };
    return config;
}

const connect = async () => {
    const config = await generateConfig()
    chrome.proxy.settings.set({
            value: config,
            scope: 'regular'
        },
        function () {
            console.log('set proxy')
        }
    );

    return config.rules.proxyForHttps;
}

const getSettings = async () => {
    let baseConnectionObject = {
        host: "",
        port: "",
        scheme: ""
    }

    const settings = await chrome.proxy.settings.get({});
    if ("rules" in settings.value && "proxyForHttps" in settings.value.rules) {
        baseConnectionObject = settings.value.rules.proxyForHttps;
    }

    return baseConnectionObject;
}

const disconnect = () => {
    chrome.proxy.settings.clear({}, _ => {
        console.log('chrome settings clear')
    })
}

chrome.runtime.onConnect.addListener(function (port) {
    
    // handlers 
    port.onMessage.addListener(async function (msg) {
        
        // connect handler
        if (msg.command === "connect") {
            await connect();
            const info = await getSettings();

            port.postMessage({
                command: "state",
                status: status["CONNECTED"],
                connection: {
                    host: info.host,
                    port: info.port,
                    scheme: info.scheme
                }
            });
        }

        // disconect handler
        if (msg.command === "disconnect") {
            disconnect();
            const info = await getSettings();

            port.postMessage({
                command: "state",
                status: status["NO_CONNECT"],
                connection: {
                    host: info.host,
                    port: info.port,
                    scheme: info.scheme
                }
            });
        }

        // fc-connect 
        if (msg.command === "fc-connect") {
            console.log(msg)
            // connection config 
        }

        // get status handler
        if (msg.command === "getStatus") {
            const info = await getSettings();

            port.postMessage({
                command: "state",
                status: info.host === "" ? status["NO_CONNECT"] : status["CONNECTED"],
                connection: {
                    host: info.host,
                    port: info.port,
                    scheme: info.scheme
                }
            });
        }
    });

    // Error handler. It's disconect not work proxy and send status to popup window
    chrome.proxy.onProxyError.addListener(details => {
        if (details.fatal) {
            disconnect()
            port.postMessage({
                command: "error",
                status: status["ERROR"],
            })
        }
    })

});