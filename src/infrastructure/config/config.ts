import { registerAs } from '@nestjs/config'

export const config = registerAs('AppConfiguration', () => ({
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || 'dev',
  corsOrigins: process.env.CORS_ORIGINS?.split(',') || '*',
  enableCrypto: process.env.ENABLE_CRYPTO === 'true',
  secretKey: process.env.SECRET_KEY_CRYPTO,
  msAuth: {
    url: process.env.MS_AUTH_URL,
  },
  msArcades: {
    url: process.env.MS_ARCADES_URL,
  },
  msIndicators: {
    url: process.env.MS_INDICATORS_URL,
  },
  msEmulators: {
    url: process.env.MS_EMULATORS_URL,
  },
}))
