interface MeeEnv {
  KV: KVNamespace;
  NOTICE_FEED_KV: KVNamespace;
  AUTHOR_EMAIL?: string;
  FEED_FROM?: string;
  DISCORD_INVITE_QUESTION?: string;
  DISCORD_INVITE_ANSWER?: string;
  DISCORD_INVITE_URL?: string;
  X_CLIENT_ID?: string;
  X_CLIENT_SECRET?: string;
  LOGIN_TOKEN?: string;
  [k: string]: any;
}

interface MeeBindings {
  Bindings: MeeEnv
}
