import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  public selectedDate?: string;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedDate = params['date']
    })
  }

  onClose(): void {
    this.router.navigate(['/appointments/'], { skipLocationChange: true });
  }
}
