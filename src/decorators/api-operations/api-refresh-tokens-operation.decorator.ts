import { applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiCustomUnauthorizedResponseDecorator } from '../api-responses/api-custom-unauthorized-response.decorator';

export const ApiRefreshTokensOperationDecorator = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Refresh tokens',
      description: 'Returns new access and refresh tokens',
    }),
    ApiOkResponse({
      description: 'Operation successful',
    }),
    ApiCustomUnauthorizedResponseDecorator,
    ApiForbiddenResponse({
      description: 'Refresh token is invalid or expired',
    }),
  );
};
