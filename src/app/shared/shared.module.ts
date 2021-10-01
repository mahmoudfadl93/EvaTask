import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './layout/header/header.component';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CustomTableComponent, AppLayoutComponent, CardComponent, HeaderComponent, SideBarComponent],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,



    CustomTableComponent,
    AppLayoutComponent,
    CardComponent,
    HeaderComponent,
    SideBarComponent
  ],

})
export class SharedModule { }
