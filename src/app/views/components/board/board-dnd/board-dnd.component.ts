import { Component, OnInit } from '@angular/core';
import { IssueStatus, JIssue, IssueType, IssuePriority } from '@ajeet/interface/issue';
import { JProject } from '@ajeet/interface/project';
import { JiraApiService } from '@ajeet/service/api.service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';

@Component({
  selector: 'board-dnd',
  templateUrl: './board-dnd.component.html',
  styleUrls: ['./board-dnd.component.scss']
})
@UntilDestroy()
export class BoardDndComponent implements OnInit {
  issueStatuses: IssueStatus[] = [
    IssueStatus.BACKLOG,
    IssueStatus.SELECTED,
    IssueStatus.IN_PROGRESS,
    IssueStatus.DONE
  ];

  project: JProject;

  constructor(private _api: JiraApiService) {}

  ngOnInit(): void {
    this.getProject();
  }

  getProject() {
    this._api
      .getProject()
      .pipe(untilDestroyed(this))
      .subscribe((project) => {
        this.project = project;
      });
  }
}
