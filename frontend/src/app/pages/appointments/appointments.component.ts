import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {
  constructor(private elem: ElementRef, private router: Router) {}
  selected?: Date | null;

  ngAfterViewInit() {
    let days = [' 3 ', ' 10 ', ' 15 ', ' 20 ',  ' 24 ']
    let elements = this.elem.nativeElement.querySelectorAll('.mat-calendar-body-cell-content.mat-focus-indicator')
    for (let element of elements) {
      let day = element.innerHTML
      if (days.includes(element.innerHTML)) {
        element.style.border='5px solid var(--color-main)';
      }
    }
  }
  navigate(route: string) {
    this.router.navigate([route], { skipLocationChange: true });
  }
}
