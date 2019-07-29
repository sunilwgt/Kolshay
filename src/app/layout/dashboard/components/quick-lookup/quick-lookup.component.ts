import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbTabChangeEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quick-lookup',
  templateUrl: './quick-lookup.component.html',
  styleUrls: ['./quick-lookup.component.scss']
})
export class QuickLookupComponent implements OnInit {
  @ViewChild('tabs') tabs;

  // public beforeChange($event: NgbTabChangeEvent) {
  //   console.log($event);
  //   if ($event.activeId = 'tab-preventchange1') {
  //     // $event.preventDefault();
  //   }
  // }

  constructor() { }

  ngOnInit() {
    console.log('tabs' , this.tabs);
    this.tabs.activeId = 'tab-preventchange1';

  }


}
