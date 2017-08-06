import { Component } from '@angular/core';

enum PageType { HOME, MAP, ADMIN };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentPage: PageType = PageType.HOME;
  pages = PageType;

  constructor() { }

}
