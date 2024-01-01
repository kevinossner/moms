import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService, Appointment } from '../../services/rest.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restService: RestService
  ) {}
  public selectedDate?: string;
  public appointments: Appointment[] = [];

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedDate = params['date']
      this.restService.getAppointmentsByDate(params['date']).subscribe((res) => {
        res.forEach((appointment) => this.appointments.push(appointment));
      });
    })
  }

  onClose(): void {
    this.router.navigate(['/appointments/'], { skipLocationChange: true });
  }
}
