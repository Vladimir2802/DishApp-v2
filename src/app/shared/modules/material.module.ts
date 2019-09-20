import {NgModule} from '@angular/core';
import {MatButtonModule, MatDialogModule, MatToolbarModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatRadioModule} from '@angular/material/radio';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRippleModule} from '@angular/material/core';








@NgModule({
  imports: [
    MatTabsModule,
    DragDropModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatRadioModule,
    MatDividerModule,
    MatMenuModule,
    MatExpansionModule,
    MatRippleModule
  ],
  exports: [
    MatTabsModule,
    DragDropModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatChipsModule,
    MatRadioModule,
    MatDividerModule,
    MatMenuModule,
    MatExpansionModule,
    MatRippleModule
  ]
})
export class MaterialModule {
}
