import { Component } from '@angular/core';
import { RestService, CreateUpdateMama } from '../../services/rest.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mama-add',
  templateUrl: './mama-add.component.html',
  styleUrls: ['./mama-add.component.scss']
})
export class MamaAddComponent {
  constructor(
    private restService: RestService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  firstName = '';
  lastName = '';
  paymentStatus = true;
  mama = <CreateUpdateMama>{};

  onAdd(): void {
    let router = this.router;
    let snackBar = this.snackBar;
    this.mama.first_name = this.firstName;
    this.mama.last_name = this.lastName;
    this.mama.payment_status = this.paymentStatus;
    this.restService.postMama(this.mama).subscribe({
      next(res) {},
      error(msg) {
        console.log('Error Getting Location: ', msg);
      },
      complete() {
        router.navigate(['/mamas/'], { skipLocationChange: true });
        snackBar.open('Mama hinzugefügt!', 'Ausblenden', {
          duration: 3 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }

  onClose(): void {
    let router = this.router;
    router.navigate(['/mamas/'], { skipLocationChange: true });
  }
}
