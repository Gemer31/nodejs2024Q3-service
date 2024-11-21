import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
// import { Error as ErrorType } from '../dto/error';
import { ApiParamId } from './api-param-id.decorator';

export const ApiDeleteUserOperation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete user',
      description: 'Delete user from library',
    }),
    ApiParamId,
    ApiNoContentResponse({
      description: 'Deleted successfully',
    }),
    ApiBadRequestResponse({
      description: 'Bad request. UserId is invalid (not uuid)',
    }),
    ApiNotFoundResponse({
      description: 'user was not found',
    }),
    ApiUnauthorizedResponse({
      description: 'Access token is missing or invalid',
    }),
  );
};
