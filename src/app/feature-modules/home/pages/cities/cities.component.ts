import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DailoqComponent } from '../../components/dailoq/dailoq.component';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  cols!: any[];
  items!: any[];
  ref!: DynamicDialogRef;
  constructor(
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private _CityService: CityService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'countryId', header: 'Country Id' },
    ]

    this.loadData()
  }

  loadData() {
    this._CityService.GetAllCity().subscribe(
      (res) => {
        this.items = res
      },
      (err) => {
        if (err.status == 401) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.statusText });
          setTimeout(() => {
            localStorage.removeItem('token');
            this.router.navigate(['/auth']);
          }, 500);
        }

      }

    )
  }

  show(type: string, row: any) {
    this.ref = this.dialogService.open(DailoqComponent, {
      data: {
        type,
        row
      },
      header: 'Edit City',
      width: '40%',
      closeOnEscape: true
    });
    this.ref.onClose.subscribe((res: any) => {
      if (res === "success") {
        this.loadData();
      }

    });
  }

  showDetails(row: any) {
    this.router.navigate(['details', row.id],
      { relativeTo: this.route });
  }

  deleteRow(row: any) {

  }



}
