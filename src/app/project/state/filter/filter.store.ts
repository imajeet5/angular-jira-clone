import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

//This will initialize the store

export interface FilterState {
  searchTerm: string;
  userIds: string[];
  onlyMyIssue: boolean;
  recentUpdate: boolean;
}

export function createInitialFilterState(): FilterState {
  return {
    searchTerm: '',
    userIds: [],
    onlyMyIssue: false,
    recentUpdate: false
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({
  name: 'filter'
})
export class FilterStore extends Store<FilterState> {
  constructor() {
    super(createInitialFilterState());
  }
}
