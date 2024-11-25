export default () => ({
  PORT: process.env.NEST_APP_PORT || 4000,
  CRYPT_SALT: process.env.CRYPT_SALT || 10,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret123123',
  JWT_SECRET_REFRESH_KEY: process.env.JWT_SECRET_REFRESH_KEY || 'secret123123',
  TOKEN_EXPIRE_TIME: process.env.TOKEN_EXPIRE_TIME || '1h',
  TOKEN_REFRESH_EXPIRE_TIME: process.env.TOKEN_REFRESH_EXPIRE_TIME || '24h',
  LOG_LEVEL: process.env.LOG_LEVEL || 3,
  LOG_MAX_SIZE_KB: process.env.LOG_MAX_SIZE_KB || 20,
});
