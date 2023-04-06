var config = {
    mode: "fixed_servers",
    rules: {
        proxyForHttps: {
            scheme: "socks5",
            host: "158.69.225.110",
            port: 59166,
            scheme: "socks5"
        },
        bypassList: ['*youtube.com']
    }
};

chrome.proxy.settings.set({
        value: config,
        scope: 'regular'
    },
    function () {
        console.log("work")
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