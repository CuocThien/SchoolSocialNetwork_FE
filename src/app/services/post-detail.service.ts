import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { HOST } from "src/app/utils/constant";


@Injectable()

export class PostDetailService {
    constructor(
        private http: HttpClient,
    ) {
    }
    getPostDetail(data: any) {
        const url = `${HOST}/post/${data}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
    report(body: any) {
        const url = `${HOST}/post/sub/report`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.post(url, body, { headers })
    }
    deletePost(postId: any) {
        const url = `${HOST}/post/sub/${postId}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.delete(url, { headers })
    }
}
