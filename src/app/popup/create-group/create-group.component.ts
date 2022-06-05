import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private service: GroupService,
    private spinner: NgxSpinnerService,
    private translate: TranslateService
  ) { }
  createGroupForm: FormGroup;
  listCategory: any;
  category = '';
  isLangEn = false;

  notiFill = ''

  ngOnInit(): void {
    this.translate.get([
      'NOTIFICATION.EMPTY_FORM',
    ])
      .subscribe(translations => {
        this.notiFill = translations['NOTIFICATION.EMPTY_FORM'];
      });
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
      this.toastr.error(this.notiFill)
      return;
    }
    this.spinner.show();
    this.service.createNewGroup(this.createGroupForm.value).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        this.activeModal.close(res.data);
        this.spinner.hide();
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg);
        this.spinner.hide();
      }
    })

  }
  createFormCreateGroup() {
    this.createGroupForm = this.formBuilder.group({
      cateId: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      image: ['']
    });
  }
  private _listCategory() {
    this.listCategory = this.categoryService.getListCategory({}).pipe(map((item: any) => item.data))
  }
}
