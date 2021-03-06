import { Injectable } from '@angular/core';
import { FilterStore, createInitialFilterState } from './filter.store';

// this will change the state

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private store: FilterStore) {}

  updateSearchTerm(searchTerm: string) {
    this.store.update({ searchTerm });
  }

  toggleOnlyMyIssue() {
    this.store.update((state) => {
      let onlyMyIssue = !state.onlyMyIssue;
      return {
        ...state,
        onlyMyIssue
      };
    });
  }

  toggleUserId(userId: string) {
    this.store.update((state) => {
      let hasUser = state.userIds.includes(userId);
      let userIds = hasUser
        ? state.userIds.filter((x) => x !== userId)
        : [...state.userIds, userId];
      return {
        ...state,
        userIds
      };
    });
  }

  toggleRecentUpdate() {
    this.store.update((state) => {
      let recentUpdate = !state.recentUpdate;
      return {
        ...state,
        recentUpdate
      };
    });
  }

  resetAll() {
    this.store.update((state) => ({
      ...state,
      ...createInitialFilterState()
    }));
  }
}
