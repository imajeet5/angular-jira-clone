import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { JIssue, IssuePriority, IssuePriorityColors } from '@ajeet/interface/issue';
import { ProjectQuery } from '@ajeet/project/state/project/project.query';
import { JUser } from '@ajeet/interface/user';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'issue-card',
  templateUrl: './issue-card.component.html',
  styleUrls: ['./issue-card.component.scss']
})
@UntilDestroy()
export class IssueCardComponent implements OnChanges {
  @Input() issue: JIssue;
  issueTypeIcon: string;
  priorityIcon: PriorityIcon;
  assignees: JUser[];
  constructor(private _projectQuery: ProjectQuery) {}

  ngOnInit(): void {
    // get the assignees from the userIds present in the issues object
    this._projectQuery.users$.pipe(untilDestroyed(this)).subscribe((users) => {
      this.assignees = this.issue.userIds.map((userId) => users.find((x) => x.id === userId));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    let issueChange = changes.issue;
    if (issueChange?.currentValue !== issueChange.previousValue) {
      this.issueTypeIcon = this.issue.type?.toLowerCase();
      this.getIssuePriorityIcon();
    }
  }

  getIssuePriorityIcon() {
    this.priorityIcon = new PriorityIcon(this.issue.priority);
  }

  openIssueDetail() {}
}

class PriorityIcon {
  name: string;
  label: string;
  color: string;

  constructor(issuePriority: IssuePriority) {
    let lowerPriorities = [IssuePriority.LOW, IssuePriority.LOWEST];
    this.label = issuePriority;
    this.name = lowerPriorities.includes(issuePriority) ? 'arrow-down' : 'arrow-up';
    this.color = IssuePriorityColors[issuePriority];
  }
}
