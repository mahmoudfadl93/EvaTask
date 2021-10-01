import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  city!: any;
  id!: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _CityService: CityService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this._CityService.GetCityById(this.id).subscribe(
          (res) => {
            this.city = res;
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

}
