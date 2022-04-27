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
    signIn(body: any) {
        const urlSignIn = `${HOST}/account/signin`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http.post(urlSignIn, body, { headers })
            .subscribe({
                next: (res: any) => {
                    localStorage.setItem('profile', JSON.stringify(res.data.profile) || '')
                    localStorage.setItem('role', res.data.role || null)
                    localStorage.setItem('token', res.data.token || null)
                    localStorage.setItem('isAlumni', res.data.isAlumni.toString() || null)
                    this.router.navigate(['/home'])
                    this.toastr.success(res.msg)
                },
                error: (err: any) => {
                    this.toastr.error(err.error.msg)
                }
            });

    }
    forgotPassword(value: any) {
        const url = `${HOST}/account/forgotPass`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        const body = JSON.stringify(value);
        return this.http.post(url, body, { headers })
    }
}
