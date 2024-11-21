import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
// import { Error as ErrorType } from '../dto/error';
import { TokensDto } from '../dto/tokens.dto';
import { ApiUnauthorizedResponseCustom } from './api-unauthorized-response.custom';

export const ApiRefreshTokensOperation = (tags: string[]) => {
  return applyDecorators(
    ApiOperation({
      summary: 'Refresh tokens',
      description: 'Returns a new pair of access and refresh tokens',
      tags,
    }),
    // ApiExtraModels(ErrorType),
    ApiOkResponse({
      description: 'Operation successful',
      // schema: {
        // $ref: getSchemaPath(TokensDto),
      // },
    }),
    ApiUnauthorizedResponseCustom,
    ApiForbiddenResponse({
      description: 'Refresh token is invalid or expired',
      // schema: {
        // $ref: getSchemaPath(ErrorType),
      // },
    }),
  );
};
