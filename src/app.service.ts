import { Injectable, Res } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  resourceNotFoundResponse(resource: string) {
    return {
      error: true,
      msg: `${resource} not found`
    }
  }
}
