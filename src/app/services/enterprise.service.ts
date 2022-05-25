import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HOST } from "../utils/constant";
@Injectable()

export class EnterpriseService {
    constructor(
        private http: HttpClient,
    ) {
    }
    createRecruitmentNews(value: any) {
        const url = `${HOST}/company/news`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.post(url, value, { headers })
    }
}
