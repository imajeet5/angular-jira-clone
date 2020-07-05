import { Component, OnInit, Input } from '@angular/core';
import { IssueStatus, IssueStatusDisplay, JIssue } from '@ajeet/interface/issue';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: '[board-dnd-list]',
  templateUrl: './board-dnd-list.component.html',
  styleUrls: ['./board-dnd-list.component.scss']
})
export class BoardDndListComponent implements OnInit {
  IssueStatusDisplay = IssueStatusDisplay;
  @Input() status: IssueStatus;
  @Input() issues: JIssue[];

  get issuesCount(): number {
    return 0;
  }

  constructor() {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray([], event.previousIndex, event.currentIndex);
  }
}
