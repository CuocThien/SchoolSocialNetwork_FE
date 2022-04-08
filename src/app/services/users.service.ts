import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HOST } from "src/app/utils/constant";


@Injectable()

export class UsersService {
    constructor(
        private http: HttpClient,
    ) {
    }
    getListUser(data: any) {
        const { type = 'main', groupId, isStudent = false } = data
        const url = `${HOST}/group/user/${type}/${groupId}${isStudent ? '?isStudent=true' : '?isStudent=false'}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
    deleteUser(body: any) {
        const url = `${HOST}/group/user`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.request('delete', url, { body, headers })
    }
    editUser(body: any) {
        const { type } = body || {}
        const url = `${HOST}/User/${type}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.put(url, body, { headers })
    }
    searchUser(data: any) {
        const { keyword, groupId, page = 1 } = data || {};
        const url = `${HOST}/group/main/search/user?${keyword ? `keyword=${keyword}&` : ''}${groupId ? `groupId=${groupId}&` : ''}${page ? `page=${page}` : ''}
            `;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
}
