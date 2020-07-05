import { Component, OnInit, Input } from '@angular/core';
import { SideBarLink } from '@ajeet/interface/ui-model/nav-link';
import { SideBarLinks } from '@ajeet/project/config/sidebar';
import { JProject } from '@ajeet/interface/project';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ProjectQuery } from '@ajeet/project/state/project/project.query';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
@UntilDestroy()
export class SidebarComponent implements OnInit {
  @Input() expanded: boolean;
  project: JProject;
  sideBarLinks: SideBarLink[];

  get sidebarWidth(): number {
    return this.expanded ? 240 : 20;
  }

  constructor(private _projectQuery: ProjectQuery) {
    this._projectQuery.all$.pipe(untilDestroyed(this)).subscribe((project) => {
      this.project = project;
    });
  }

  ngOnInit(): void {
    this.sideBarLinks = SideBarLinks;
  }
}
