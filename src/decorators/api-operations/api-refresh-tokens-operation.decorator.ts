import { applyDecorators } from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiCustomUnauthorizedResponseDecorator } from '../api-responses/api-custom-unauthorized-response.decorator';

export const ApiRefreshTokensOperationDecorator = (tags: string[]) => {
  return applyDecorators(
    ApiOperation({
      summary: 'Refresh tokens',
      description: 'Returns a new pair of access and refresh tokens',
      tags,
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
