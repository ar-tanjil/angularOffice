import { NgModule } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
    exports: [
        MatSidenavModule,
        MatIconModule,
        MatDividerModule,
        MatButtonModule,
        MatBadgeModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatCheckboxModule,
        MatSelectModule,
        MatRadioModule,
        MatToolbarModule,
        MatMenuModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatStepperModule,
        MatTabsModule,
        MatExpansionModule
    ]
})
export class MaterialModule{
    
}