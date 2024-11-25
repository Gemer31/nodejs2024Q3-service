import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export const ApiLoginOperationDecorator = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Login',
      description: 'Allows a user to log in',
    }),
    ApiOkResponse({
      description: 'User successfully logged in',
    }),
    ApiBadRequestResponse({
      description:
        'Bad request. Body does not contain required field(-s) or field value(-s) is(are) incorrect',
    }),
    ApiForbiddenResponse({
      description: 'Authentication failed',
    }),
  );
};
