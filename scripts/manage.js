// generate connection config
const generateConfig = ({host, schema, port, bypassList = []}) => {
    try {
        var config = {
            mode: "fixed_servers",
            rules: {
                proxyForHttps: {
                    scheme: schema,
                    host: host,
                    port: Number(port),
                },
                bypassList: bypassList
            }
        };

        return config
    } catch (err) {
        throw new Error("Error with generated config")
    }
}

// connect proxy
export const connect = ({host, schema, port}) => {
    try {
        // need get settings and pass "bypassList"
        const config = generateConfig({host, schema, port});

        return chrome.proxy.settings.set({
                value: config,
                scope: 'regular'
            },
            () => console.log('set-proxy', config.rules.proxyForHttps)
        );

    } catch (err) {
        throw new Error("Error from connection func")
    }
}

// disconect proxy
export const disconnect = async (callback) => {
    new Promise((resolve, reject) => {
        chrome.proxy.settings.clear({}, _ => {
            console.log('chrome settings clear');
            resolve("success")
        })
    }).then(data => {
        if (data === "success" && callback !== undefined) {
            callback()
        }
    })
}

// get settings about proxy
export const getStatus = async () => {
    let baseConnectionObject = null;

    const settings = await chrome.proxy.settings.get({});
    if ("rules" in settings.value && "proxyForHttps" in settings.value.rules) {
        baseConnectionObject = settings.value.rules.proxyForHttps;
    }

    return baseConnectionObject;
}