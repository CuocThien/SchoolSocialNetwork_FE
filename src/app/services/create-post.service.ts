import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { HOST } from "../utils/constant";
@Injectable()

export class CreatePostService {
    constructor(
        private http: HttpClient,
    ) {
    }
    createPost(value: any) {
        const url = `${HOST}/post`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.post(url, value, { headers })
    }
    updatePost(value: any) {
        const url = `${HOST}/post/sub`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.put(url, value, { headers })
    }
}
