import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeammatesRouterModule } from '../../components/teammates-router/teammates-router.module';
import { MotdPageComponent } from './motd-page.component';

const routes: Routes = [
  {
    path: '',
    component: MotdPageComponent,
  },
];

/**
 * Module for motd page.
 */
@NgModule({
  declarations: [
    MotdPageComponent,
  ],
  exports: [
    MotdPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TeammatesRouterModule,
  ],
})
export class MotdPageModule { }
