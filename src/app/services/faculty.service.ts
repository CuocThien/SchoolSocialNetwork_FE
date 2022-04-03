import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HOST } from "src/app/utils/constant";


@Injectable()

export class FacultyService {
    constructor(
        private http: HttpClient,
    ) {
    }
    getListFaculty() {
        const url = `${HOST}/group/main/fac`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
    getListAllFaculty() {
        const url = `${HOST}/group/main/fac?isAll=true`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
    createNewFaculty(body: any) {
        const url = `${HOST}/group/main/fac`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.post(url, body, { headers })
    }
    editFaculty(body: any) {
        const url = `${HOST}/group/main/fac`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.put(url, body, { headers })
    }
}
