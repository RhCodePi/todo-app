declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TODO_SERVER_PORT: string;
      HOST_SERVICE: string;
      COUCHBASE_CONNECT: string;
      COUCHBASE_USERNAME: string;
      COUCHBASE_PASSWORD: string;
      COUCHBASE_BUCKET: string;
      COUCHBASE_COLLECTION: string;
    }
  }
}

export {};
