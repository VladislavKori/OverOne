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

const generateConfig = async (list) => {
    console.log(list)
    const rNum = random(0, list.length - 1);
    const connection = list[rNum];

    const host = connection.host;
    const scheme = connection.schema[0];
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
                "https://www.youtube.com",
                "https://rr3---sn-ab5sznze.googlevideo.com/*",
                "https://i.ytimg.com"
                // "*.radiorecord.ru", // work pattern
                // "*.youtube.com"
            ]
        }
    };
    return config;
}

const connect = async (type, data) => {
    let list;
    if (type === "simple") list = (await fetchProxyList()).proxys;
    if (type === "fast") list = [data];
    if (type === "json") list = data.proxys;

    const config = await generateConfig(list)
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

const saveInStorage = (key, value) => {
    chrome.storage.local.set({
        key: value
    }).then(() => {
        console.log("Value is set");
    });
}

const getFromStorage = (key, value) => {
    chrome.storage.local.get(["key"]).then((result) => {
        console.log("Value currently is " + result.key);
    });
}

chrome.runtime.onConnect.addListener(function (port) {

    // handlers 
    port.onMessage.addListener(async function (msg) {

        // connect handler
        if (msg.command === "connect") {
            await connect("simple");
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
            await connect("fast", msg.connectionConfig);
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

        // json-connect
        if (msg.command === "json-connect") {
            await connect("json", msg.data);
            const info = await getSettings();
            saveInStorage();

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