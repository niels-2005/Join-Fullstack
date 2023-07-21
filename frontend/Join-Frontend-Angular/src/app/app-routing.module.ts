import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SummaryComponent } from './components/summary/summary.component';
import { LegalnoticeComponent } from './components/legalnotice/legalnotice.component';
import { BoardComponent } from './components/board/board.component';
import { AddtaskComponent } from './components/addtask/addtask.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { HelpComponent } from './components/help/help.component';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'summary', component: SummaryComponent},
  {path: 'legal-notice', component: LegalnoticeComponent},
  {path: 'board', component: BoardComponent},
  {path: 'add-task', component: AddtaskComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'help', component: HelpComponent},
  { path: 'resetpassword/:uid/:token', component: ResetpasswordComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
