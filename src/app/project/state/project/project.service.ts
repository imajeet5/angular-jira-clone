import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { arrayUpdate } from '@datorama/akita';
import { Observable, of } from 'rxjs';
import { JProject } from '@ajeet/interface/project';
import { JUser } from '@ajeet/interface/user';
import { ProjectStore } from './project.store';
import { finalize, catchError, map } from 'rxjs/operators';
import { JIssue } from '@ajeet/interface/issue';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private _http: HttpClient, private _store: ProjectStore) {}

  getProject(): Observable<JProject> {
    return this._http.get<JProject>('/data/project.json').pipe(
      map((project) => {
        this._store.update((state) => {
          return {
            ...state,
            ...project
          };
        });
      }),
      finalize(() => {
        this._store.setLoading(false);
      }),
      catchError((error) => {
        this._store.setError(error);
        return of(error);
      })
    );
  }

  login(): Observable<JUser> {
    return this._http.get<JUser>('/data/user.json');
  }

  updateIssue(issue: JIssue) {
    this._store.update((state) => {
      let issues = arrayUpdate(state.issues, issue.id, issue);
      console.log(issues);
      return {
        ...state,
        issues
      };
    });
  }
}
