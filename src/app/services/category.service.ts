import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HOST } from "src/app/utils/constant";
import { Category } from "../entities/category.model";
import { Observable } from "rxjs";


@Injectable()

export class CategoryService {
    constructor(
        private http: HttpClient,
    ) {
    }
    getListCategory(data: any): Observable<Category> {
        const { type = 'group', isDelete = false } = data
        const url = `${HOST}/category/${type}/${isDelete}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get<Category>(url, { headers })
    }
    getListCategoryPost(data: any) {
        const { isDelete = false } = data
        const url = `${HOST}/category/post/${isDelete}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
    createNewCategory(body: any) {
        const { type } = body || {}
        const url = `${HOST}/category/${type}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.post(url, body, { headers })
    }
    editCategory(body: any) {
        const { type } = body || {}
        const url = `${HOST}/category/${type}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.put(url, body, { headers })
    }
    addAOC(body: any) {
        const url = `${HOST}/account/aoc`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.post(url, body, { headers })
    }
}
