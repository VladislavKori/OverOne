export type TranspSchema = "socks4" | "socks5" | "https" 

export type TranspConnection = {
    host: string
    port: number | string
    schema: TranspSchema
}

export type TranspError = {
    info: string 
}

export interface TranspData {
    connection: TranspConnection | null
    error: TranspError
}