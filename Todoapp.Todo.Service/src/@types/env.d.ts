declare global {
    namespace NodeJS {
      interface ProcessEnv {
        TODO_SERVER_PORT: string
        HOST_SERVICE: string
      }
    }
  }
  
  export {};
  