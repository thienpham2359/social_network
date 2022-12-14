export const jwtConstants = {
  atStrategyName: 'jwt',
  atSecret: 'AccessTokenSecretKey',
  atExpireIn: 60 * 60 * 24,
  rtStrategyName: 'jwt-refresh',
  rtSecret: 'RefreshTokenSecretKey',
  rtExpireIn: 60 * 60 * 24 * 7,
};
