import { Component } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Mama } from '../../services/rest.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-mamas',
  templateUrl: './mamas.component.html',
  styleUrls: ['./mamas.component.scss']
})
export class MamasComponent {
  constructor(
    private restService: RestService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  mamas: Mama[] = [];
  selectedId: number | undefined;
  dialogRef: any

  fetchMamas() {
    this.mamas.length = 0;
    this.restService.getMamas().subscribe((res) => {
      res.forEach((mama) => this.mamas.push(mama));
    });
  }

  ngOnInit() {
    this.fetchMamas();
  }

  navigate(route: string) {
    this.router.navigate([route], { skipLocationChange: true });
  }

  onEdit(id: number) {
    this.router.navigate(['/mamas/edit/', id], { skipLocationChange: true });
  }

  onDelete() {
    if (this.selectedId) {
      let snackBar = this.snackBar;
      this.restService.deleteMama(this.selectedId).subscribe({
        next(res) {},
        error(msg) {
          console.log('Error Getting Location: ', msg);
        },
        complete: () => {
          this.fetchMamas();
          this.dialogRef.close()
          snackBar.open('Mama gelöscht!', 'Ausblenden', {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
    }
  }

  onCancel() {
    this.dialogRef.close()
  }

  openDialog(templateRef: any, id: number) {
    this.selectedId = id;
    this.dialogRef = this.dialog.open(templateRef, {
     width: '300px'
   });
  }
}
