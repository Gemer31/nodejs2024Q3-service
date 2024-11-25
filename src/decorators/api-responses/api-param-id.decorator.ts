import { ApiParam } from '@nestjs/swagger';

export const ApiParamId = ApiParam({
  name: 'id',
  type: 'string',
  format: 'uuid',
  required: true,
});
