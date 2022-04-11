import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HOST } from "../utils/constant";
@Injectable()

export class CommentService {
    constructor(
        private http: HttpClient,
    ) {
    }
    getComment(value: any) {
        const { postId, page = 1 } = value || {}
        const url = `${HOST}/comment/${postId}?page=${page}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
    postComment(value: any) {
        const url = `${HOST}/comment`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.post(url, value, { headers })
    }
    updateComment(value: any) {
        const url = `${HOST}/comment`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.put(url, value, { headers })
    }
    deleteComment(value: any) {
        const url = `${HOST}/comment/${value}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.delete(url, { headers })
    }
    getReply(value: any) {
        const { commentId, page = 1 } = value || {}
        const url = `${HOST}/comment/reply/${commentId}?page=${page}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
    postReply(value: any) {
        const url = `${HOST}/comment/reply`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.post(url, value, { headers })
    }
    updateReply(value: any) {
        const url = `${HOST}/comment/reply`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.put(url, value, { headers })
    }
    deleteReply(value: any) {
        const url = `${HOST}/comment/reply/${value}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.delete(url, { headers })
    }
}
