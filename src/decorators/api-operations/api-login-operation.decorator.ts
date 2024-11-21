import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

export const ApiLoginOperationDecorator = (tags: string[]) => {
  return applyDecorators(
    ApiOperation({
      summary: 'Login',
      description: 'Allows a user to log in',
      tags,
    }),
    ApiOkResponse({
      description: 'User successfully logged in',
    }),
    ApiBadRequestResponse({
      description:
        'Bad request. Body does not contain required field(-s) or field value(-s) is(are) incorrect',
    }),
    ApiForbiddenResponse({
      description:
        'Authentication failed',
    }),
  );
};
