import { ApiNotFoundResponse } from '@nestjs/swagger';

export const ApiCustomNotFoundResponseDecorator = (entityName: string) => {
  return ApiNotFoundResponse({
    description: `${entityName} was not found`,
  });
}
