import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
// import { Error as ErrorType } from '../dto/error';
import { SwaggerExamples } from '../helpers/swagger.helper';
import { ApiParamId } from './api-param-id.decorator';

export const ApiGetUserOperation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get single user by id',
      description: 'Get single user by id',
    }),
    ApiParamId,
    ApiCreatedResponse({
      description: 'user is created',
      example: SwaggerExamples.USER,
    }),
    // ApiExtraModels(ErrorType),
    ApiOkResponse({
      description: 'Successful operation',
      example: SwaggerExamples.USER,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. userId is invalid (not uuid)',
    }),
    ApiUnauthorizedResponse({
      description: 'Access token is missing or invalid',
    }),
    ApiNotFoundResponse({
      description: 'user was not found',
    }),
  );
};
