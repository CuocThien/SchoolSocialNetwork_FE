import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient,
  ) { }

  addUser(body: any) {
    const url = `${HOST}/group/user`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    return this.http.post(url, body, { headers })
  }
  changeAdmin(body: any) {
    const url = `${HOST}/group/user/admin`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    return this.http.post(url, body, { headers })
  }
  createNewGroup(body: any) {
    const url = `${HOST}/group/sub`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    return this.http.post(url, body, { headers })
  }
  updateGroup(body: any) {
    const url = `${HOST}/group/sub`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    return this.http.put(url, body, { headers })
  }
  report(body: any) {
    const url = `${HOST}/group/sub/report`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    return this.http.post(url, body, { headers })
  }
  getListReportGroup(data: any) {
    const { page = 1 } = data || {};
    const url = `${HOST}/group/sub/report?page=${page}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    return this.http.get(url, { headers })
  }
  getListReportPost(data: any) {
    const { page = 1 } = data || {};
    const url = `${HOST}/post/sub/report/all?page=${page}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    return this.http.get(url, { headers })
  }
  searchGroup(data: any) {
    const { page = 1, keyword = '' } = data || {};
    const url = `${HOST}/group/sub/search?page=${page}&keyword=${keyword}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    return this.http.get(url, { headers })
  }
  getListGroupByUserId(data: any) {
    const { page = 1 } = data || {};
    const url = `${HOST}/group/user?page=${page}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    return this.http.get(url, { headers })
  }
  getListGroupRelative(data: any) {
    const { page = 1 } = data || {};
    const url = `${HOST}/group/relative?page=${page}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    return this.http.get(url, { headers })
  }
  getGroupDetail(groupId: any) {
    const url = `${HOST}/group/${groupId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    return this.http.get(url, { headers })
  }

  getListPost(data: any) {
    const { groupId, page = 1 } = data || {}
    const url = `${HOST}/post/sub/${groupId}?page=${page}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    return this.http.get(url, { headers })
  }
  checkAdminSubGr(data: any) {
    const { groupId } = data || {}
    const url = `${HOST}/group/sub/admin?groupId=${groupId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept-Language': localStorage.getItem('lang'), 'Authorization': 'Bearer ' + localStorage.getItem('token') })
    return this.http.get(url, { headers })
  }
}
