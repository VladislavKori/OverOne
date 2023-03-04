var config = {
    mode: "fixed_servers",
    rules: {
        proxyForHttp: {
            scheme: "socks5",
            host: "184.170.245.148:4145"
        },
        bypassList: ["foobar.com"]
    }
};