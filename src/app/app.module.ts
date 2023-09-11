import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AddIssueComponent } from './components/add-issue/add-issue.component';
import { EditIssueComponent } from './components/edit-issue/edit-issue.component';
import { IssueListComponent } from './components/issue-list/issue-list.component';
import { AppRoutingModule } from './app-routing.module';
import { BugService } from './bug.service';

@NgModule({
  declarations: [AppComponent, AddIssueComponent, EditIssueComponent, IssueListComponent],
  imports: [
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [BugService],
  bootstrap: []
})
export class AppModule {}