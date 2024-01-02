import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  RestService,
  Appointment,
  Mama,
  Registration,
  CreateRegistration,
} from '../../services/rest.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restService: RestService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  public selectedDate?: string;
  public appointments: Appointment[] = [];
  public mamas: Mama[] = [];
  private selectedAppointment?: number;
  public selectedMom?: number;
  private dialogRef: any;
  private registration = <CreateRegistration>{};

  fetchMoms() {
    this.mamas.length = 0;
    this.restService.getMamas().subscribe((res) => {
      res.forEach((mama) => this.mamas.push(mama));
    });
  }

  fetchAppointments() {
    this.appointments.length = 0;
    this.route.params.subscribe((params) => {
      this.selectedDate = params['date'];
      this.restService
        .getAppointmentsByDate(params['date'])
        .subscribe((res) => {
          res.forEach((appointment) => this.appointments.push(appointment));
        });
    });
  }

  ngOnInit() {
    this.fetchAppointments();
    this.fetchMoms();
  }

  onAdd(appointmentId: number): void {
    if (this.selectedMom) {
      this.registration.mom_id = this.selectedMom;
      this.registration.appointment_id = appointmentId;
      this.restService.postRegistration(this.registration).subscribe({
        next(res) {},
        error(msg) {
          console.log('Error Getting Location: ', msg);
        },
        complete: () => {
          this.fetchAppointments();
          this.selectedMom = undefined;
        },
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/calendar/'], { skipLocationChange: true });
  }

  onDeleteRegistration(id: number): void {
    this.restService.deleteRegistration(id).subscribe({
      next(res) {},
      error(msg) {
        console.log('Error Getting Location: ', msg);
      },
      complete: () => {
        this.fetchAppointments();
      },
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onDeleteAppointment(): void {
    if (this.selectedAppointment) {
      let snackBar = this.snackBar;
      this.restService.deleteAppointment(this.selectedAppointment).subscribe({
        next(res) {},
        error(msg) {
          console.log('Error Getting Location: ', msg);
        },
        complete: () => {
          this.fetchAppointments();
          this.dialogRef.close();
          snackBar.open('Termin gelöscht!', 'Ausblenden', {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
    }
  }

  openDialog(templateRef: any, id: number) {
    this.selectedAppointment = id;
    this.dialogRef = this.dialog.open(templateRef, {
      width: '300px',
    });
  }

  setAll(id: number, checked: boolean): void {
    this.restService.putRegistration(id, checked).subscribe({
      next(res) {},
      error(msg) {
        console.log('Error Getting Location: ', msg);
      },
      complete() {

      },
    });
    console.log(checked);
    console.log(id)
  }
}
