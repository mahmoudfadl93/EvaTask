import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_services/interceptor/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppConfigService } from './_services/app-confiq/app-config.service';
import { BaseService } from './_services/base/base.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressSpinnersComponent } from './components/progress-spinners/progress-spinners.component';
import { SpinnerInterceptorInterceptor } from './_services/spinner/spinner-interceptor.interceptor';
import { SpinnerOverlayServiceService } from './_services/spinner-overlay/spinner-overlay-service.service';

const appInitializer = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};




@NgModule({
  declarations: [ProgressSpinnersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    OverlayModule
  ],
  exports: [
    ProgressSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AppConfigService],
    },
    SpinnerOverlayServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptorInterceptor,
      multi: true,
    },
    BaseService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },

  ]
})
export class CoreModule { }
