import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { HOST } from "../utils/constant";
@Injectable()

export class LogInService {
    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private router: Router,
    ) {
    }
    signIn(value: any) {
        const urlSignIn = `${HOST}/account/signin`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http.post(urlSignIn, value, { headers })
            .toPromise().then((res: any) => {
                localStorage.setItem('profile', JSON.stringify(res.data.profile) || '')
                localStorage.setItem('role', res.data.role || null)
                localStorage.setItem('token', res.data.token || null)
                this.router.navigate(['/home'])
                this.toastr.success(res.msg)
            })
            .catch(err => {
                this.toastr.error(err.error.msg)
            });

    }
    forgotPassword(value: any) {
        const url = `${HOST}/account/forgotPass`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers })
    }
}
