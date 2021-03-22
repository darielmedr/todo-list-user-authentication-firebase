import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DragDropModule } from '@angular/cdk/drag-drop';

const materialModules: any[] = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTooltipModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule
];

const cdkModules: any[] = [
  DragDropModule,
];

@NgModule({
  declarations: [],
  imports: [
    materialModules,
    cdkModules
  ],
  exports: [
    materialModules,
    cdkModules
  ]
})
export class MaterialModule { }
