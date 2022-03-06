import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
// import { CookieService } from "ngx-cookie-service";

@Injectable()

export class LogInService {
    constructor(
        private http: HttpClient,
        // private toastr:ToastrService,
        private router: Router,
        // private cookieService: CookieService
    ) {
    }
    signIn(value: any) {
        const urlSignIn = 'https://schoolsocialnetwork.herokuapp.com/account/signin';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        const body = JSON.stringify(value);
        this.router.navigate(['/'])
        // console.log(body)
        return this.http.post(urlSignIn, body, { headers })
            .toPromise().then(res => {
                console.log(res)
            })
            .catch(err => console.log(err));

    }
}
