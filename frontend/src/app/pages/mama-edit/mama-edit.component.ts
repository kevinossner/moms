import { Component } from '@angular/core';
import { RestService, CreateUpdateMama } from '../../services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mama-edit',
  templateUrl: './mama-edit.component.html',
  styleUrls: ['./mama-edit.component.scss']
})
export class MamaEditComponent {
  constructor(
    private restService: RestService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  firstName = '';
  lastName = '';
  paymentStatus = true;
  id: number | undefined;
  mama = <CreateUpdateMama>{};

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.restService.getMama(params['id']).subscribe((res) => {
        this.firstName = res.first_name;
        this.lastName = res.last_name;
        this.paymentStatus = res.payment_status;
        this.id = res.id;
      });
    });
  }

  onSave(): void {
    let router = this.router;
    let snackBar = this.snackBar;
    this.mama.first_name = this.firstName;
    this.mama.last_name = this.lastName;
    this.mama.payment_status = this.paymentStatus;
    this.restService.putMama(this.id!, this.mama).subscribe({
      next(res) {},
      error(msg) {
        console.log('Error Getting Location: ', msg);
      },
      complete() {
        router.navigate(['/mamas/'], { skipLocationChange: true });
        snackBar.open('Mama bearbeited!', 'Ausblenden', {
          duration: 3 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }

  onClose(): void {
    this.router.navigate(['/mamas/'], { skipLocationChange: true });
  }
}
