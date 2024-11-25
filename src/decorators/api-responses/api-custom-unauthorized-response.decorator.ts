import { ApiUnauthorizedResponse } from '@nestjs/swagger';

export const ApiCustomUnauthorizedResponseDecorator = ApiUnauthorizedResponse({
  description: 'Access token is missing or invalid',
});
