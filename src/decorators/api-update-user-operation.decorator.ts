import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
// import { Error as ErrorType } from '../dto/error';
import { SwaggerExamples } from '../helpers/swagger.helper';

export const ApiUpdateUserOperation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update user password',
      description: 'Update user password by UUID',
    }),
    ApiParam({
      name: 'id',
      type: 'string',
      format: 'uuid',
      required: true,
    }),
    // ApiExtraModels(ErrorType),
    ApiOkResponse({
      description: 'The user has been updated.',
      example: SwaggerExamples.USER,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. userId is invalid (not uuid)',
    }),
    ApiUnauthorizedResponse({
      description: 'Access token is missing or invalid',
    }),
    ApiForbiddenResponse({
      description: 'oldPassword is wrong',
    }),
    ApiNotFoundResponse({
      description: 'User was not found',
    }),
  );
};
