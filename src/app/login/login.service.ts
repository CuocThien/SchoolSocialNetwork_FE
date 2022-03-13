import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Injectable()

export class LogInService {
    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private router: Router,
    ) {
    }
    signIn(value: any) {
        const urlSignIn = 'https://schoolsocialnetwork.herokuapp.com/account/signin';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        const body = JSON.stringify(value);
        return this.http.post(urlSignIn, body, { headers })
            .toPromise().then((res: any) => {
                localStorage.setItem('user', res.data.user || null)
                localStorage.setItem('role', res.data.Role || null)
                localStorage.setItem('token', res.data.Token || null)
                this.router.navigate(['/home'])
                this.toastr.success(res.msg)
            })
            .catch(err => {
                this.toastr.error(err.error.msg)
            });

    }
}
