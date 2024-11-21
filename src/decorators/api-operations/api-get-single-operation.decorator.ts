import { applyDecorators } from '@nestjs/common';
import { ApiParamId } from '../api-responses/api-param-id.decorator';
import { ApiCustomUnauthorizedResponseDecorator } from '../api-responses/api-custom-unauthorized-response.decorator';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { SwaggerExamples } from '../../helpers/swagger.helper';

export const ApiGetSingleOperation = (
  entityName: string,
  example: SwaggerExamples,
) => {
  return applyDecorators(
    ApiParamId,
    ApiCustomUnauthorizedResponseDecorator,
    ApiOperation({
      summary: `Get single ${entityName} by id`,
      description: `Gets single ${entityName} by id`,
    }),
    ApiOkResponse({
      description: 'Successful operation',
      example,
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid)',
    }),
    ApiNotFoundResponse({
      description: `${entityName} was not found`,
    }),
  );
};
