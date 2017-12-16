import { Component } from '@angular/core';

import { buildInfo } from './buildInfo';

enum PageType { HOME, MAP, ADMIN }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentPage: PageType = PageType.HOME;
  pages = PageType;
  buildInfo = buildInfo;

  constructor() { }

}
