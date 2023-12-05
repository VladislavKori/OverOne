export type TranspSchema = "socks4" | "socks5" | "https" | "http"

export type TranspConnection = {
    host: string
    port: number | string
    scheme: TranspSchema
}

export type TranspError = {
    info: string 
}

export interface TranspData {
    connection: TranspConnection | null
    error: TranspError
}

export interface TranspSettings {
    bypassList: Array<string>
    incognito: boolean
}

export interface IMessage {
    command: string
    data: TranspData
}

export interface IListener {
    connectionState: Accessor<IConnection>,
    updateConnectionState: Setter<IConnection>,
    settingsState: Accessor<TranspSettings>,
    updateSettingsState: Setter<TranspSettings>
}