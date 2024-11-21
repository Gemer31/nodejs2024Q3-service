import { ApiUnauthorizedResponse } from '@nestjs/swagger';

export const ApiUnauthorizedResponseCustom = ApiUnauthorizedResponse({
  description: 'Access token is missing or invalid',
});
