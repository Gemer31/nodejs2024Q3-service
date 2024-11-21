import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ApiCustomUnauthorizedResponseDecorator } from '../api-responses/api-custom-unauthorized-response.decorator';
import { SwaggerExamples } from '../../helpers/swagger.helper';

export const ApiGetAllOperation = (
  entityName: string,

) => {
  return applyDecorators(
    ApiCustomUnauthorizedResponseDecorator,
    ApiOperation({
      summary: `Get ${entityName} list`,
      description: `Gets all ${entityName} list`,
    }),
    ApiOkResponse({
      description: 'Successful operation',
      example: SwaggerExamples.ALBUMS,
    }),
  );
};
