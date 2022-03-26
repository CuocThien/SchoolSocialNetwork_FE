import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HOST } from "src/app/utils/constant";


@Injectable()

export class HomeIndexService {
    constructor(
        private http: HttpClient,
    ) {
    }
    getListPostMainGroupForTeacher(page: any) {
        const url = `${HOST}/post/main/grgv?isStudent=false&page=${page}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
    getListPostMainGroupForStudent(page: any) {
        const url = `${HOST}/post/main/grsv?page=${page}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
    getListPostMainGroupFacultyForTeacher(data: any, page: any) {
        const url = `${HOST}/post/main/${data}?isStudent=false&page=${page}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
    getListPostMainGroupFacultyForStudent(data: any, page: any) {
        const url = `${HOST}/post/main/${data}?page=${page}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
}
