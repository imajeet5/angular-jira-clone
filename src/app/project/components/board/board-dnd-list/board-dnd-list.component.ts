import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IssueStatus, IssueStatusDisplay, JIssue } from '@ajeet/interface/issue';
import { FilterState } from '@ajeet/project/state/filter/filter.store';
import { ProjectService } from '@ajeet/project/state/project/project.service';
import { Observable } from 'rxjs';

@Component({
  selector: '[board-dnd-list]',
  templateUrl: './board-dnd-list.component.html',
  styleUrls: ['./board-dnd-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BoardDndListComponent implements OnInit {
  IssueStatusDisplay = IssueStatusDisplay;
  @Input() status: IssueStatus;
  @Input() currentUserId: string;
  @Input() issues$: Observable<JIssue[]>;
  issues: JIssue[];

  get issuesCount(): number {
    return 0;
  }

  constructor(private _projectService: ProjectService) {}

  ngOnInit(): void {
    this.issues$.subscribe((issues) => {
      this.issues = issues;
      console.log(issues);
    });
  }

  drop(event: CdkDragDrop<JIssue[]>) {
    debugger;
    // this is the currently selected issue
    let newIssue: JIssue = { ...event.item.data };
    // this is the array of new issues shorted with the updated position
    let newIssues = [...event.container.data];
    // if issue is dropped in the same container then just update the Position of the issues
    if (event.previousContainer === event.container) {
      moveItemInArray(newIssues, event.previousIndex, event.currentIndex);
      this.updateListPosition(newIssues);
    }
    // this is for when issues are moving cross container
    // in this we update the positions of each issues, also as the status of the issue has changes we will update the same also
    else {
      transferArrayItem(
        event.previousContainer.data,
        newIssues,
        event.previousIndex,
        event.currentIndex
      );
      this.updateListPosition(newIssues);

      newIssue.status = event.container.id as IssueStatus;
      this._projectService.updateIssue(newIssue);
    }
  }

  private updateListPosition(newList: JIssue[]) {
    // as the issues are in shorted order, we just have to update the position of the issues
    newList.forEach((issue, idx) => {
      let newIssueWithNewPosition = { ...issue, listPosition: idx + 1 };
      this._projectService.updateIssue(newIssueWithNewPosition);
    });
  }

  filterIssues(issues: JIssue[], filter: FilterState): JIssue[] {
    const { onlyMyIssue, recentUpdate, searchTerm, userIds } = filter;
    return issues.filter((issue) => {
      let isMatchTerm = searchTerm
        ? issue.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
        : true;

      let isIncludeUsers = userIds.length
        ? issue.userIds.some((userId) => userIds.includes(userId))
        : true;
      let isMyIssue = onlyMyIssue
        ? this.currentUserId && issue.userIds.includes(this.currentUserId)
        : true;

      return isMatchTerm && isIncludeUsers && isMyIssue;
    });
  }
}
