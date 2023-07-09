import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotMyPasswordComponent } from './components/forgot-my-password/forgot-my-password.component';
import { SitebarComponent } from './components/sitebar/sitebar.component';
import { KanbanprojecttoolheaderComponent } from './components/kanbanprojecttoolheader/kanbanprojecttoolheader.component';
import { SummaryComponent } from './components/summary/summary.component';
import { LegalnoticeComponent } from './components/legalnotice/legalnotice.component';
import { BoardComponent } from './components/board/board.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AddtaskboardbuttonComponent } from './components/addtaskpopup/addtaskboardbutton.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddtaskComponent } from './components/addtask/addtask.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactsComponent } from './components/contacts/contacts.component';
import { FormsModule } from '@angular/forms';
import { AddcontactpopupComponent } from './components/addcontactpopup/addcontactpopup.component';
import { EditcontactpopupComponent } from './components/editcontactpopup/editcontactpopup.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HelpComponent } from './components/help/help.component';
import { GroundbarComponent } from './components/groundbar/groundbar.component';
import { DatePipe } from '@angular/common';
import { SingletaskpopupComponent } from './components/singletaskpopup/singletaskpopup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotMyPasswordComponent,
    SitebarComponent,
    KanbanprojecttoolheaderComponent,
    SummaryComponent,
    LegalnoticeComponent,
    BoardComponent,
    AddtaskboardbuttonComponent,
    AddtaskComponent,
    ContactsComponent,
    AddcontactpopupComponent,
    EditcontactpopupComponent,
    HelpComponent,
    GroundbarComponent,
    SingletaskpopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
