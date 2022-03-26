import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HOST } from "src/app/utils/constant";


@Injectable()

export class ChangePasswordService {
    constructor(
        private http: HttpClient,
    ) {
    }
    changePassword(value: any) {
        const url = `${HOST}/account/changePass`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.post(url, value, { headers })
    }
    resetPassword(value: any) {
        const url = `${HOST}/account/resetPass`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http.post(url, value, { headers })
    }
}
