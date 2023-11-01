export type TranspSchema = "socks4" | "socks5" | "https" 

export type TranspConnection = {
    host: string
    port: number | string
    schema: schema
}

export type TranspError = {
    info: string 
}
