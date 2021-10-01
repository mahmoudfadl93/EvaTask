import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthContainerComponent } from './auth-container/auth-container.component';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '@shared/shared.module';
import { AuthService } from './auth/auth.service';


@NgModule({
  declarations: [
    AuthContainerComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
