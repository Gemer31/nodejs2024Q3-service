import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';
// import { Error as ErrorType } from '../dto/error';
import { TokensDto } from '../dto/tokens.dto';

export const ApiLoginOperation = (tags: string[]) => {
  return applyDecorators(
    ApiOperation({
      summary: 'Login',
      description: 'Allows a user to log in',
      tags,
    }),
    // ApiExtraModels(ErrorType),
    ApiOkResponse({
      description: 'User successfully logged in',
      // schema: {
      //   $ref: getSchemaPath(TokensDto),
      // },
    }),
    ApiBadRequestResponse({
      description:
        'Bad request. Body does not contain required field(-s) or field value(-s) is(are) incorrect',
      // schema: {
      //   // $ref: getSchemaPath(ErrorType),
      // },
    }),
    ApiForbiddenResponse({
      description:
        "Authentication failed (no user with such login, password doesn't match actual one, etc.)",
      // schema: {
      //   // $ref: getSchemaPath(ErrorType),
      // },
    }),
  );
};
