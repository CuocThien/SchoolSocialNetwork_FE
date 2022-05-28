import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HOST } from "../utils/constant";
@Injectable()

export class EnterpriseService {
    constructor(
        private http: HttpClient,
    ) {
    }
    createRecruitmentNews(value: any) {
        const url = `${HOST}/company/news`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.post(url, value, { headers })
    }
    updateRecruitmentNews(value: any) {
        const url = `${HOST}/company/news`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.put(url, value, { headers })
    }
    getRecruitmentNewsDetail(newsId: any) {
        const url = `${HOST}/company/news/${newsId}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
    deleteRecruitmentNews(id: any) {
        const url = `${HOST}/company/news?newsId=${id}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.delete(url, { headers })
    }
    getListNewsByCompany(data: any) {
        const { page = 1 } = data || {}
        const url = `${HOST}/company/news?page=${page}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
    getListNewsSameCompany(data: any) {
        const { page = 1, companyId, newsId } = data || {}
        const url = `${HOST}/company/news/${companyId}/${newsId}?page=${page}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
    getListNewsForNewfeed(data: any) {
        const { page = 1 } = data || {};
        const url = `${HOST}/post/company/recruitment?page=${page}`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
        return this.http.get(url, { headers })
    }
}
