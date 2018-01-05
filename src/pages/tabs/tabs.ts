import { Component } from '@angular/core';

import { PersonPage } from '../person/person';
import { SearchPage } from '../search/search';
import { HomePage } from '../home/home';
import { SchedulePage } from '../schedule/schedule';
import { LeavePage } from '../leave/leave';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SearchPage;
  tab3Root = SchedulePage;
  tab4Root = LeavePage;
  tab5Root = PersonPage;

  constructor() {

  }
}
