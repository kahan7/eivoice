import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ProcessParam = createParamDecorator((param: string, ctx: ExecutionContext) => {
  const request = ctx.switchToRpc().getData();

  if (!param) {
    return request.data;
  }

  return request.data[param];
});
