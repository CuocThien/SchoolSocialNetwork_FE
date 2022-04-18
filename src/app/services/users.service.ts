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
        const { type = 'main', groupId, isStudent = false, isAdmin = false, page = 1, isDelete } = data || {}
        let where = ''
        where += `isStudent=${isStudent}&`
        where += `isAdmin=${isAdmin}&`
        if (isDelete != undefined)
            where += `isDeleted=${isDelete}&`
        where += `page=${page}`
        const url = `${HOST}/group/user/${type}/${groupId}?${where}`;
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
        const { type = 'main', keyword, groupId, isStudent = false, page = 1 } = data || {};
        let queryString = '';
        queryString += keyword ? `keyword=${keyword}&` : ''
        queryString += groupId ? `groupId=${groupId}&` : ''
        queryString += `isStudent=${isStudent}&`
        queryString += `page=${page}`
        const url = `${HOST}/group/${type}/search/user?${queryString}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
}
