import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HOST } from "src/app/utils/constant";


@Injectable()

export class AccountService {
    constructor(
        private http: HttpClient,
    ) {
    }
    getListAccount(data: any) {
        const { roleId, faculty, page = 1, isDelete = false } = data || {};
        let query = '';
        query += `roleId=${roleId}&`;
        query += `faculty=${faculty}&`;
        query += `page=${page}&`;
        query += `isDelete=${isDelete}`;
        const url = `${HOST}/account?${query}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
    deleteAccount(body: any) {
        const url = `${HOST}/account/delete`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.request('delete', url, { body, headers })
    }
    deleteMultiAccount(body: any) {
        const url = `${HOST}/group/listuser`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.request('delete', url, { body, headers })
    }
    changeToAlumni(body: any) {
        const url = `${HOST}/group/user/alumni`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.put(url, body, { headers })
    }
    recoveryAccount(body: any) {
        const url = `${HOST}/account/recovery`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.put(url, body, { headers })
    }
}
