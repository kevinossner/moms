import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestService, CreateAppointment } from '../../services/rest.service';

@Component({
  selector: 'app-appointments-add',
  templateUrl: './appointments-add.component.html',
  styleUrls: ['./appointments-add.component.scss'],
})
export class AppointmentsAddComponent {
  constructor(
    private restService: RestService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  name = '';
  selectedDate = '';
  appointment = <CreateAppointment>{};

  onAdd(): void {
    let router = this.router;
    let snackBar = this.snackBar;
    this.appointment.name = this.name;
    this.appointment.date = new Date(this.selectedDate).toLocaleString(
      'de-DE',
      { day: '2-digit', month: '2-digit', year: 'numeric' }
    );
    this.restService.postAppointment(this.appointment).subscribe({
      next(res) {},
      error(msg) {
        console.log('Error Getting Location: ', msg);
      },
      complete() {
        router.navigate(['/appointments/'], { skipLocationChange: true });
        snackBar.open('Termin hinzugefügt!', 'Ausblenden', {
          duration: 3 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }

  onClose(): void {
    let router = this.router;
    router.navigate(['/appointments/'], { skipLocationChange: true });
  }
}
