import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HOST } from "../utils/constant";
@Injectable()

export class SignUpService {
    constructor(
        private http: HttpClient,
    ) {
    }
    signup(value: any) {
        const url = `${HOST}/account/signup`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.post(url, value, { headers })
    }
}
