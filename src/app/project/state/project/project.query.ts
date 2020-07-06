import { ProjectState, ProjectStore } from './project.store';
import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { IssueStatus, JIssue } from '@ajeet/interface/issue';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProjectQuery extends Query<ProjectState> {
  constructor(protected store: ProjectStore) {
    super(store);
  }
  isLoading$ = this.selectLoading();
  all$ = this.select();
  issue$ = this.select('issues');
  users$ = this.select('users');

  issueByStatus$ = (status: IssueStatus): Observable<JIssue[]> => {
    return this.select('issues').pipe(
      map((issues) => {
        let filteredIssues = issues.filter((x) => x.status === status);
        return filteredIssues;
      })
    );
  };
}
