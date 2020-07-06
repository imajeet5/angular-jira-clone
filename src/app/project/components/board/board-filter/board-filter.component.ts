import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FilterQuery } from '@ajeet/project/state/filter/filter.query';
import { FilterService } from '@ajeet/project/state/filter/filter.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProjectQuery } from '@ajeet/project/state/project/project.query';
import { JUser } from '@ajeet/interface/user';

@Component({
  selector: 'board-filter',
  templateUrl: './board-filter.component.html',
  styleUrls: ['./board-filter.component.scss']
})
@UntilDestroy()
export class BoardFilterComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  userIds: string[] = [];

  constructor(
    public filterQuery: FilterQuery,
    public filterService: FilterService,
    public projectQuery: ProjectQuery
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), untilDestroyed(this))
      .subscribe((term) => {
        this.filterService.updateSearchTerm(term);
      });

    this.filterQuery.userIds$.pipe(untilDestroyed(this)).subscribe((userIds) => {
      this.userIds = userIds;
    });
  }

  isUserSelected(user: JUser) {
    return this.userIds.includes(user.id);
  }
  userChanged(user: JUser) {
    this.filterService.toggleUserId(user.id);
  }

  recentUpdateChanged() {
    this.filterService.toggleRecentUpdate();
  }

  onlyMyIssueChanged() {
    this.filterService.toggleOnlyMyIssue();
  }

  resetAll() {
    this.searchControl.setValue('');
    this.filterService.resetAll();
  }
}
