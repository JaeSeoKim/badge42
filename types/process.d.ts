declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;

    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;

    FORTY_TWO_CLIENT_ID: string;
    FORTY_TWO_CLIENT_SECRET: string;

    GITHUB_ID: string;
    GITHUB_SECRET: string;
  }
}
