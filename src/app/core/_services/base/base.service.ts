import { Injectable, Injector } from '@angular/core';
import { AppConfigService } from '../app-confiq/app-config.service';

@Injectable()
export class BaseService {
  public readonly baseUrl!: string;
  public readonly Version!: string;
  constructor(env: AppConfigService) {
    this.baseUrl = env.config.servicesBasePath + 'api/';
  }
}
