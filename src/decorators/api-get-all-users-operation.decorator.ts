import {
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { SwaggerExamples } from '../helpers/swagger.helper';
import { ApiUnauthorizedResponseCustom } from './api-unauthorized-response.custom';

export const ApiGetUsersOperation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all users',
      description: 'Get all users',
    }),
    // ApiExtraModels(ErrorType),
    ApiOkResponse({
      description: 'Successful operation',
      example: SwaggerExamples.USER,
    }),
    ApiUnauthorizedResponseCustom,
  );
};
