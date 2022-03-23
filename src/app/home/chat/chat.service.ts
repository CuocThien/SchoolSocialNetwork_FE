import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { HOST } from "src/app/utils/constant";


@Injectable()

export class ChatService {
    constructor(
        private http: HttpClient,
        private toastr: ToastrService,
        private router: Router,
    ) {
    }
    getListConversation() {
        const url = `${HOST}/conversation`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
    getMessage(data: any) {
        const { page, conversationId } = data;
        let query = ``
        conversationId ? query += `?conversationId=${conversationId}` : query;
        page ? query += `&page=${page}` : query
        const url = `${HOST}/message${query}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
    searchAccount(data: any) {
        const { page, keyword } = data;
        let query = ``
        keyword ? query += `?keyword=${keyword}` : query;
        page ? query += `&page=${page}` : query
        const url = `${HOST}/account/search${query}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
}
