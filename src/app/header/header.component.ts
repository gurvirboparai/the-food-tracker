import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Create an event emitter to open sidebar when screen is smaller
  @Output() SidebarOpen = new EventEmitter();

  constructor() { }

  // Create obj for current date and time
  today: number = Date.now();

  ngOnInit(): void {
  }

  // Open menu method
  openMenu() {
    this.SidebarOpen.emit();
  }

}
