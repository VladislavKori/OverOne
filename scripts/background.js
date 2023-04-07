import {data} from './data.js'
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const generateConfig = () => {

    const rNum = random(0, data.length - 1);
    const connection = data[rNum]
    
    const host = connection.ip;
    const scheme = connection.protocols[0];
    const port = Number(connection.port);

    console.log(host, scheme, port)

    var config = {
        mode: "fixed_servers",
        rules: {
            proxyForHttps: {
                scheme: scheme,
                host: host,
                port: port,
            },
            bypassList: [
                "*.radiorecord.ru", // work pattern
                "*.youtube.com"
            ]
        }
    };

    console.log(config)
    return config;
}

chrome.proxy.settings.set({
        value: generateConfig(),
        scope: 'regular'
    },
    function () {
        // console.log(data)
    }
);

chrome.proxy.onProxyError.addListener(details => {
    if (details.fatal) {
        chrome.proxy.settings.clear({},
            function () {
                console.log('chrome settings clear')
            }
        )
    }
})