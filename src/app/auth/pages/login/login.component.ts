import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from '@core/_services/app-confiq/app-config.service';
import { AuthLogin } from 'app/auth/auth/auth.model';
import { AuthService } from 'app/auth/auth/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  form!: FormGroup;
  siteKey!: string;
  constructor(
    private _AuthService: AuthService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder,) {

  }

  ngOnInit(): void {

    this.createForm();
  }


  createForm() {
    this.form = this.fb.group({
      email: ['mfadl4201@gmail.com', Validators.compose([Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')])],
      password: ['01122670882', [Validators.required, Validators.minLength(5)]],
    })
  }

  submit() {
    this.submitted = true;
    if (!this.form.valid) {
      return;
    }
    this.loading = true;
    const data: AuthLogin = {
      Email: this.form.get('email')?.value,
      Password: this.form.get('password')?.value
    }

    this._AuthService.login(data).subscribe(
      (res) => {
        this.router.navigate(['/home']);

      },
      (err) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.statusText });
      }
    )


  }



  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

}
