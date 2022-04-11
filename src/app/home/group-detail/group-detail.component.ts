import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CreatePostComponent } from 'src/app/popup/create-post/create-post.component';
import { CropImageGroupComponent } from 'src/app/popup/crop-image-group/crop-image-group.component';
import { DeleteUserComponent } from 'src/app/popup/delete-user/delete-user.component';
import { ReportComponent } from 'src/app/popup/report/report.component';
import { GroupService, UsersService } from 'src/app/services/index';
@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class GroupDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private service: GroupService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private userService: UsersService
  ) { }
  fullname: any;
  image: any;
  groupDetail: any;
  groupName: any;
  listPost = [];
  listAdmin = [];
  totalAdmin: number;
  totalMember: number;
  listMember = [];
  groupId = '';
  isPostActive = true;
  page = 1;
  maxPage = 1;
  pageUser = 1;
  maxPageUser = 1;
  myAvatar: any;
  isRename = false;
  isSearch = false;
  searchString: string;
  isAdmin = false;
  userId: any;
  private modalRef: NgbModalRef;

  ngOnInit(): void {
    this.myAvatar = JSON.parse(localStorage.getItem('profile') || '').avatar;
    this.fullname = JSON.parse(localStorage.getItem('profile') || '').fullname;
    this.userId = JSON.parse(localStorage.getItem('profile') || '')._id;
    this.groupId = this.route.snapshot.paramMap.get("id");
    this._checkAdmin();
    this._groupDetail();
    this._getListPost();
    this._getListAdmin();
    this._getListMember();
  }
  private _groupDetail() {
    this.service.getGroupDetail(this.groupId).subscribe({
      next: (res: any) => {
        this.groupDetail = res.data;
        this.image = this.groupDetail.group.image;
        this.groupName = this.groupDetail.group.nameEn;
      }
    })
  }
  private _checkAdmin() {
    this.service.checkAdminSubGr({ groupId: this.groupId }).subscribe({
      next: (res: any) => {
        this.isAdmin = res.data
      }
    })
  }

  private _getListPost() {
    this.service.getListPost({ groupId: this.groupId, page: this.page }).subscribe({
      next: (res: any) => {
        this.listPost = [...this.listPost, ...res.data.result];
        this.maxPage = res.data.total ? Math.ceil(res.data.total / 10) : 1;
      }
    })
  }

  private _getListAdmin() {
    this.userService.getListUser({
      type: 'sub',
      groupId: this.groupId,
      isAdmin: true
    }).subscribe({
      next: (res: any) => {
        this.listAdmin = res.data.result;
        this.totalAdmin = res.data.total;
      }
    })
  }
  private _getListMember() {
    this.userService.getListUser({
      type: 'sub',
      groupId: this.groupId,
      isAdmin: false,
      page: this.page
    }).subscribe({
      next: (res: any) => {
        this.listMember = [...this.listMember, ...res.data.result];
        this.maxPageUser = Math.ceil(res.data.total / 10);
        this.totalMember = res.data.total;
      }
    })
  }
  goToPageUser() {
    this.pageUser++;
    this._getListMember();
  }
  createPost() {
    this.modalRef = this.modalService.open(CreatePostComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
    })
    this.modalRef.componentInstance.groupId = this.groupId;
    this.modalRef.result.then((res: any) => {
      const data = res.data;
      data.avatar = this.myAvatar;
      data.fullname = this.fullname;
      data.countCmt = 0;
      this.listPost.unshift(data);
    }).catch(() => { });
  }
  updateImage(imgUrl: any) {
    this.modalRef = this.modalService.open(CropImageGroupComponent, {
      backdrop: 'static',
      centered: true,
      size: 'xl'
    })
    this.modalRef.componentInstance.imgUrl = imgUrl;
    this.modalRef.result.then((res: any) => {
      this.image = res.url;
      this._updateGroup();
    }).catch(() => { });
  }
  private _updateGroup() {
    this.service.updateGroup({
      _id: this.groupId,
      image: this.image,
      nameEn: this.groupName,
      nameVi: this.groupName
    }).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg)
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg)
      }
    })
  }
  rename() {
    this.isRename = false;
    this._updateGroup();
  }
  onRename() {
    this.isRename = true;
  }
  report(type: any, id: any) {
    this.modalRef = this.modalService.open(ReportComponent, {
      backdrop: 'static',
      centered: true,
      size: 'md'
    })
    this.modalRef.componentInstance.type = type;
    this.modalRef.componentInstance.id = id;
    this.modalRef.result.then((res: any) => {
      this.toastr.success(res.msg)
    }).catch(() => { });
  }
  onPost() {
    this.isPostActive = true;
  }
  onMember() {
    this.isPostActive = false;
  }
  goToPage() {
    this.page++;
    if (this.isSearch) {
      this.search();
      return;
    }
    this._getListPost();
  }
  search() {
    this.pageUser = 1;
    this.isSearch = true;
    if (this.searchString == '') {
      this.isSearch = false;
      this._getListMember();
      return;
    }
    this.userService.searchUser({
      type: 'sub',
      groupId: this.groupId,
      keyword: this.searchString,
      page: this.pageUser
    }).subscribe({
      next: (res: any) => {
        this.listMember = res.data.result;
        this.maxPageUser = Math.ceil(res.data.total / 10);
      }
    })
  }
  removeUser(userId: any, index: any) {
    const reqData = {
      userId: userId,
      groupId: this.groupId
    }
    this.modalRef = this.modalService.open(DeleteUserComponent, {
      backdrop: 'static',
      centered: true,
      size: 'md'
    })
    this.modalRef.componentInstance.data = reqData;
    this.modalRef.result.then((res: any) => {
      this.totalMember--;
      this.listMember.splice(index, 1)
    }).catch(() => { });
  }
  addAdmin(user: any, index: any) {
    const reqData = {
      groupId: this.groupId,
      userId: user.userId,
      isRemove: false
    }
    this.service.changeAdmin(reqData).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.listAdmin.push(user);
        this.totalAdmin++;
        this.listMember.splice(index, 1);
        this.totalMember--;
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg)
      }
    })
  }
  removeAdmin(admin: any, index: any) {
    const reqData = {
      groupId: this.groupId,
      userId: admin.userId,
      isRemove: true
    }
    this.service.changeAdmin(reqData).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.listMember.push(admin);
        this.totalAdmin--;
        this.listAdmin.splice(index, 1);
        this.totalMember++;
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg)
      }
    })
  }
  deletePost(postId: any, index: any) {
    this.modalRef = this.modalService.open(DeleteUserComponent, {
      backdrop: 'static',
      centered: true,
      size: 'md'
    })
    this.modalRef.componentInstance.data = { postId };
    this.modalRef.componentInstance.isPost = true;
    this.modalRef.result.then((res: any) => {
      this.listPost.splice(index, 1)
    }).catch(() => { });
  }
  updatePost(post: any, index: any) {
    this.modalRef = this.modalService.open(CreatePostComponent, {
      backdrop: 'static',
      size: 'lg',
      centered: true,
    })
    this.modalRef.componentInstance.groupId = this.groupId;
    this.modalRef.componentInstance.postId = post._id;
    this.modalRef.componentInstance.content = post.content;
    this.modalRef.componentInstance.isUpdate = true;

    this.modalRef.result.then((res: any) => {
      const data = res.data;
      data.avatar = this.myAvatar;
      data.fullname = this.fullname;
      data.countCmt = 0;
      this.listPost[index] = data;
    }).catch(() => { });
  }
}
