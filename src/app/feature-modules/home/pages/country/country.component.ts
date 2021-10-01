import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { forkJoin } from 'rxjs';
import { DailoqComponent } from '../../components/dailoq/dailoq.component';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],

})
export class CountryComponent implements OnInit {
  cols!: any[];
  items!: any[];
  id!: number;
  country!: any;
  ref!: DynamicDialogRef;
  constructor(
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router,
    private _CityService: CityService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private _CountryService: CountryService) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'City' },
      { field: 'country.name', header: 'Country' },
    ]
    this.loadData();
  }
  loadData() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        forkJoin({
          country: this._CountryService.GetCountryById(this.id),
          tableItems: this._CityService.GetAllCityOfCountry(this.id)
        }).subscribe(
          ({ country, tableItems }) => {
            this.country = country;
            this.items = tableItems
          },
          (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err.statusText });

            if (err.status == 401) {
              setTimeout(() => {
                localStorage.removeItem('token');
                this.router.navigate(['/auth']);
              }, 500);
            }
          }

        )

      }
    )
  }


  show(type: string, row: any) {
    this.ref = this.dialogService.open(DailoqComponent, {
      data: {
        type,
        row: row,
        countryId: this.id
      },
      header: type === 'new-city' ? 'New City' : 'Edit City',
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

    this.router.navigate(['city/details', row.id],
      { relativeTo: this.route.parent });

  }

  deleteRow(row: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });

        this._CityService.DeleteCityById(row.id).subscribe(
          (res) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Success Delete' });
            this.loadData()
          }
        )
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

}
