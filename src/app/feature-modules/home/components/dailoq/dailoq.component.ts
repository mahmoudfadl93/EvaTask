import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CityService } from '../../services/city.service';
import { CountryService } from '../../services/country.service';
@Component({
  selector: 'app-dailoq',
  templateUrl: './dailoq.component.html',
  styleUrls: ['./dailoq.component.scss']
})
export class DailoqComponent implements OnInit {

  form!: FormGroup;
  type!: string;
  data!: any
  constructor(
    private fb: FormBuilder,
    private _CountryService: CountryService,
    private ref: DynamicDialogRef,
    private _CityService: CityService,
    private messageService: MessageService,
    public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.type = this.config.data.type;
    this.data = this.config.data.row;
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
    })

    if (this.type.includes('edit')) {
      this.form.patchValue({
        name: this.data.name
      })
    }
  }

  submit() {
    if (!this.form.valid) {
      return;
    }
    let Data!: any;
    if (this.type === 'edit-country') {
      Data = {
        name: this.form.get('name')?.value,
        id: this.data.id
      }

      this._CountryService.EditCountry(Data).subscribe(
        (res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Success Create" });
          this.ref.close("success");
        },
        (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.statusText });
        }
      )
    } else if (this.type === 'new-country') {
      Data = {
        name: this.form.get('name')?.value,
      }
      this._CountryService.AddCountry(Data).subscribe(
        (res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Success Create" });
          this.ref.close("success")
        },
        (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.statusText });
        }
      )
    }
    else if (this.type === 'new-city') {
      Data = {
        name: this.form.get('name')?.value,
        CountryId: +this.config.data.countryId
      }

      this._CityService.AddCity(Data).subscribe(
        (res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Success Create" });
          this.ref.close("success")
        },
        (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.statusText });
        }
      )

    } else if (this.type === 'edit-city') {
      Data = {
        id: this.data.id,
        name: this.form.get('name')?.value,
        CountryId: this.data.countryId
      }

      this._CityService.EditCity(Data).subscribe(
        (res) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "Success Create" });
          this.ref.close("success")
        },
        (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.statusText });
        }
      )
    }



  }

}
