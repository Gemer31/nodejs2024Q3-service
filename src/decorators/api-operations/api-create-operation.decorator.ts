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
import { ApiCustomUnauthorizedResponseDecorator } from '../api-responses/api-custom-unauthorized-response.decorator';
import { SwaggerExamples } from '../../helpers/swagger.helper';
// import { Error as ErrorType } from '../dto/error';

export const ApiAddOperation = (
  entityName: string,
  example: SwaggerExamples
) => {
  return applyDecorators(
    ApiOperation({
      summary: `Add new ${entityName.toLowerCase()}`,
      description: `Add new ${entityName.toLowerCase()}`,
    }),
    ApiCreatedResponse({
      description: `${entityName} is created`,
      example,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. body does not contain required fields',
    }),
    ApiCustomUnauthorizedResponseDecorator,
    ApiForbiddenResponse({
      description:
        'Authentication failed',
    }),
  );
};
