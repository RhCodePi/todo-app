declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GATEWAY_SERVICE_PORT: string;
      PATHFILTER_REGEX: string;
      AUTH_PATH: string;
      TARGET: string;
      SECRET_KEY: string;
      TODO_TARGET: string;
      TODO_PATHFILTER_REGEX: string;
      TODO_PATH: string;
    }
  }
}

export {};