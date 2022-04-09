import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { CategoryService, GroupService } from '../../services/index';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class CreateGroupComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private service: GroupService
  ) { }
  createGroupForm: FormGroup;
  listCategory: any;
  category = '';
  isLangEn = false;

  ngOnInit(): void {
    this.isLangEn = localStorage.getItem('lang') === 'en';
    this.createFormCreateGroup();
    this._listCategory();
  }
  ngDoCheck() {
    this.isLangEn = localStorage.getItem('lang') === 'en';
  }

  onClose() {
    this.activeModal.dismiss('failed');
  }
  onSubmit() {
    if (this.createGroupForm.invalid) {
      this.toastr.error('Please fill information!')
      return;
    }
    console.log("💁 => CreateGroupComponent => this.createGroupForm.value", this.createGroupForm.value)
    this.service.createNewGroup(this.createGroupForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.activeModal.close(res.data);
      },
      error: (err: any) => {
        console.log("💁 => CreateGroupComponent => err", err)
        this.toastr.error(err.error.msg);
      }
    })

  }
  createFormCreateGroup() {
    this.createGroupForm = this.formBuilder.group({
      cateId: ['', Validators.required],
      name: ['', Validators.required],
      image: ['']
    });
  }
  private _listCategory() {
    this.listCategory = this.categoryService.getListCategory({}).pipe(map((item: any) => item.data))
  }
}
