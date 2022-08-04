import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  // Create variables
  menuOpen$: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  closeSidebar(){
    this.menuOpen$ = false;
  }

  openSidebar(){
    this.menuOpen$ = true;
  }

}
