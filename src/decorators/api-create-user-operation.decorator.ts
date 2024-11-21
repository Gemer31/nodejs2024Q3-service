import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
// import { Error as ErrorType } from '../dto/error';
import { TokensDto } from '../dto/tokens.dto';
import { SwaggerExamples } from '../helpers/swagger.helper';
import { ApiUnauthorizedResponseCustom } from './api-unauthorized-response.custom';

export const ApiCreateUserOperation = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Add new user',
      description: 'Add new user',
    }),
    ApiCreatedResponse({
      description: 'user is created',
      example: SwaggerExamples.USER,
    }),
    // ApiExtraModels(ErrorType),
    ApiOkResponse({
      description: 'User successfully logged in',
      // schema: {
        // $ref: getSchemaPath(TokensDto),
      // },
    }),
    ApiBadRequestResponse({
      description: 'Bad request. body does not contain required fields',
    }),
    ApiUnauthorizedResponseCustom,
    ApiForbiddenResponse({
      description:
        'Authentication failed (no user with such login, password doesn\'t match actual one, etc.)',
      // schema: {
      //   // $ref: getSchemaPath(ErrorType),
      // },
    }),
  );
};
