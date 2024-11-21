import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiCustomUnauthorizedResponseDecorator } from '../api-responses/api-custom-unauthorized-response.decorator';
import { ApiParamId } from '../api-responses/api-param-id.decorator';

export const ApiDeleteOperation = (
  entityName: string,
) => {
  return applyDecorators(
    ApiParamId,
    ApiCustomUnauthorizedResponseDecorator,
    ApiOperation({
      summary: `Delete ${entityName}`,
      description: `Delete ${entityName} from library`,
    }),
    ApiNoContentResponse({
      description: 'Deleted successfully',
    }),
    ApiBadRequestResponse({
      description: 'Bad request. Id is invalid (not uuid)',
    }),
    ApiNotFoundResponse({
      description: `${entityName} was not found`,
    }),
  );
};
