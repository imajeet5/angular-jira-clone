import { Component, OnInit, Input } from '@angular/core';
import { SideBarLink } from '@ajeet/interface/ui-model/nav-link';
import { SideBarLinks } from '@ajeet/config/sidebar';
import { JProject } from '@ajeet/interface/project';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() expanded: boolean;
  project: JProject;

  get sidebarWidth(): number {
    return this.expanded ? 240 : 20;
  }

  sideBarLinks: SideBarLink[];

  constructor() {}

  ngOnInit(): void {
    this.sideBarLinks = SideBarLinks;
  }
}
