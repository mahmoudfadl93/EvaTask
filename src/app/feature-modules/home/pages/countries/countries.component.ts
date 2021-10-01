import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DailoqComponent } from '../../components/dailoq/dailoq.component';
import { CountryService } from '../../services/country.service';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],

})
export class CountriesComponent implements OnInit {
  cols!: any[];
  items!: any[];
  ref!: DynamicDialogRef;
  constructor(
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private _CountryService: CountryService) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
    ]

    this.loadData()
  }

  loadData() {
    this._CountryService.GetAllCountry().subscribe(
      (res) => {
        this.items = res
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

  show(type: string, row: any) {
    this.ref = this.dialogService.open(DailoqComponent, {
      data: {
        type,
        row
      },
      header: type === 'new' ? 'New Country' : 'Edit Country',
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

    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });

        this._CountryService.DeleteCountryById(row.id).subscribe(
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
