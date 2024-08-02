declare global{
    namespace NodeJS{
        interface ProcessEnv{
            GATEWAY_SERVICE_PORT: string
            PATHFILTER_REGEX: string
            AUTH_PATH: string
            TARGET: string
        }
    }
}


export {}