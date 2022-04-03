import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { HOST } from "src/app/utils/constant";


@Injectable()

export class ProfileService {
    constructor(
        private http: HttpClient,
    ) {
    }
    getProfile() {
        const url = `${HOST}/account/profile`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
    updateUser(data: any) {
        const url = `${HOST}/account/profile`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.put(url, data, { headers })
    }
}
