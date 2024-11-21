import { applyDecorators } from '@nestjs/common';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SwaggerExamples } from '../../helpers/swagger.helper';
import { ApiParamId } from '../api-responses/api-param-id.decorator';
import { ApiCustomUnauthorizedResponseDecorator } from '../api-responses/api-custom-unauthorized-response.decorator';
import { ApiCustomNotFoundResponseDecorator } from '../api-responses/api-custom-not-found-response.decorator';

export const ApiUpdateOperation = (
  entityName: string,
  example: SwaggerExamples,
) => {
  return applyDecorators(
    ApiParamId,
    ApiCustomUnauthorizedResponseDecorator,
    ApiCustomNotFoundResponseDecorator(entityName),
    ApiOperation({
      summary: `Update ${entityName}`,
      description: `Update ${entityName} by UUID`,
    }),
    ApiOkResponse({
      description: `The ${entityName} has been updated.`,
      example,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid)',
    }),
  );
};
