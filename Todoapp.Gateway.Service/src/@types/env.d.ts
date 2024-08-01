declare global{
    namespace NodeJS{
        interface ProcessEnv{
            GATEWAY_SERVICE_PORT: string
            PATHFILTER_REGEX: string
            PATH: string
        }
    }
}


export {}