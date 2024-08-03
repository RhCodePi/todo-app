declare global{
    namespace NodeJS{
        interface ProcessEnv{
            AUTH_SERVICE_PORT: string
            HOST_SERVICE: string
            COUCHBASE_CONNECT: string
            COUCHBASE_USERNAME: string
            COUCHBASE_PASSWORD: string
            COUCHBASE_BUCKET: string
            COUCHBASE_COLLECTION: string
            SECRET_KEY: string
            EXPIRES_IN: string
            REFRESH_TOKEN_KEY: string
        }
    }
}


export {}