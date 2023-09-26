// generate connection config
const generateConfig = async (proxy) => {
    try {
        const host = proxy.host;
        const scheme = proxy.schema[0];
        const port = Number(proxy.port);

        var config = {
            mode: "fixed_servers",
            rules: {
                proxyForHttps: {
                    scheme: scheme,
                    host: host,
                    port: port,
                },
                bypassList: []
            }
        };

        return config
    } catch (err) {
        throw new Error("Error with generated config")
    }
}

// connect proxy
export const connect = async (data) => {
    try {
        const config = await generateConfig(data);

        return chrome.proxy.settings.set({
                value: config,
                scope: 'regular'
            },
            async function () {
                console.log('set-proxy', config.rules.proxyForHttps)
            }
        );
    } catch (err) {
        console.error(err)
        throw new Error("Error from connection func")
    }
}

// disconect proxy
export const disconnect = () => {
    chrome.proxy.settings.clear({}, _ => {
        console.log('chrome settings clear')
    })
}


// get settings about proxy
export const getSettings = async () => {
    let baseConnectionObject = null;

    const settings = await chrome.proxy.settings.get({});
    if ("rules" in settings.value && "proxyForHttps" in settings.value.rules) {
        baseConnectionObject = settings.value.rules.proxyForHttps;
    }

    return baseConnectionObject;
}