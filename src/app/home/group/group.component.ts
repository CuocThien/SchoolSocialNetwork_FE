import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faBookOpenReader, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CreateGroupComponent } from 'src/app/popup/create-group/create-group.component';
import { GroupService } from 'src/app/services';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class GroupComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private service: GroupService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }
  faBook = faBookOpenReader;
  faEye = faEye;

  // Loading state for skeleton screens
  isLoading = false;
  isLoadingRelative = false;


  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  isCheck = false;
  isRefresh = false;

  private modalRef: NgbModalRef;
  searchString = '';
  isSearch = false;
  userId: any;
  page = 1;
  maxPage = 1;
  listGroup = [];
  pageRelative = 1;
  maxPageRelative = 1;
  listGroupRelative = [];
  listAllGroup = [];
  pageAllGroup = 1;
  maxPageAllGroup = 1;

  isAllGroup = false;
  contentButton = 'BUTTON.ALL_GROUP';

  // Phase 2: Search and filter enhancements
  showSuggestions = false;
  searchSuggestions: string[] = [];
  recentSearches: string[] = [];
  activeFilter = 'all'; // 'all', 'joined', 'suggested'
  showFilters = false;

  ngOnInit(): void {
    this._loadRecentSearches();
    this._getListGroup();
    this._getListGroupRelative();
    this.userId = JSON.parse(localStorage.getItem('profile'))._id || '';
  }

  private _getListGroup() {
    this.isLoading = true;
    this.spinner.show();
    this.service.getListGroupByUserId({ page: this.page }).subscribe({
      next: (res: any) => {
        if (res.data?.result) {
          this.listGroup = [...this.listGroup, ...res.data?.result];
        }
        this.maxPage = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        this.isLoading = false;
        this.spinner.hide();
      },
      error: () => {
        this.isLoading = false;
        this.spinner.hide();
      }
    })
  }
  private _getListGroupRelative() {
    this.isLoadingRelative = true;
    this.spinner.show();
    this.service.getListGroupRelative({ page: this.page }).subscribe({
      next: (res: any) => {
        if (res.data?.result) {
          this.listGroupRelative = [...this.listGroupRelative, ...res.data?.result];
        }
        this.maxPageRelative = res.data.total ? Math.ceil(res.data.total / 3) : 1;
        this.isLoadingRelative = false;
        this.spinner.hide();
      },
      error: () => {
        this.isLoadingRelative = false;
        this.spinner.hide();
      }
    })
  }
  redirectGroupDetail(group: any) {
    const groupId = !!group._id ? group._id : group.groupId
    this.router.navigate([`home/group/${groupId}`])
  }
  goToPage() {
    this.page++;
    if (this.isSearch) {
      this._search();
      return;
    }
    this._getListGroup();
  }
  goToPageRelative() {
    this.pageRelative++;
    this._getListGroupRelative();
  }
  createGroup() {
    this.modalRef = this.modalService.open(CreateGroupComponent, {
      backdrop: 'static',
      size: 'md',
      centered: true,
    });
    this.modalRef.result.then((res: any) => {
      this.isSearch = false;
      this.listGroup = [];
      this.listGroupRelative = [];
      this._getListGroup();
      this._getListGroupRelative();
    }).catch((err: any) => {

    });
  }
  joinNow(group: any, index: any) {
    this.spinner.show();
    this.service.addUser({
      groupId: group.groupId,
      userId: this.userId
    }).subscribe({
      next: (res: any) => {
        this.toastr.success(res.msg);
        group.groupId = group.groupId;
        this.listGroupRelative.splice(index, 1);
        this.listGroup.push(group);
        this.goToGroup(group.groupId)
        this.spinner.hide();
      },
      error: (err: any) => {
        this.toastr.error(err.error.msg);
        this.spinner.hide();
      }
    })
  }
  private _search() {
    this.isLoading = true;
    this.spinner.show();
    this.service.searchGroup({
      keyword: this.searchString,
      page: this.page
    }).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.spinner.hide();
        this.listGroup = [...this.listGroup, ...res.data.result];
        this.maxPage = res.data.total ? Math.ceil(res.data.total / 10) : 1;
        this.listAllGroup = [...this.listAllGroup, ...res.data.result];
        this.maxPageAllGroup = res.data.total ? res.data.total : 1;
      },
      error: () => {
        this.isLoading = false;
        this.spinner.hide();
      }
    })
  }
  goToGroup(groupId: any) {
    this.router.navigate([`home/group/${groupId}`])
  }
  searchGroup() {
    this.listGroup = []
    this.listAllGroup = []
    if (!this.searchString) {
      this.isSearch = false;
      if (!this.isAllGroup) {
        this._getListGroup();
      } else {
        this._getListAllGroup();
      }
      return;
    }
    this.isSearch = true;
    this.page = 1;
    this._search();
  }

  private _getListAllGroup() {
    this.isLoading = true;
    this.spinner.show();
    this.service.getListGroup({ page: this.pageAllGroup }).subscribe({
      next: (res: any) => {
        if (this.pageAllGroup == 1) {
          this.listAllGroup = [];
        }
        this.listAllGroup = [...this.listAllGroup, ...res.data.result];
        this.maxPageAllGroup = res.data.total ? res.data.total : 1;
        this.isLoading = false;
        this.spinner.hide();
      },
      error: () => {
        this.isLoading = false;
        this.spinner.hide();
      }
    })
  }
  onEnd(event: any) {
    if (!this.isAllGroup) return;
    this.pageAllGroup++;
    if (this.pageAllGroup === this.maxPageAllGroup) return;
    if (this.isSearch) {
      this._search();
      return;
    }
    this.isRefresh = false;
    this._getListAllGroup();
  }

  changeButton(event: any) {
    event.preventDefault();
    this.isAllGroup = !this.isAllGroup;
    if (this.isAllGroup) {
      if (!this.listAllGroup.length)
        this._getListAllGroup();
    }
    this.contentButton = this.isAllGroup ? 'BUTTON.YOUR_GROUP' : 'BUTTON.ALL_GROUP';
  }

  // New methods for enhanced UX
  switchToAllGroups() {
    this.isAllGroup = true;
    this.contentButton = 'BUTTON.YOUR_GROUP';
    if (!this.listAllGroup.length) {
      this._getListAllGroup();
    }
  }

  clearSearch() {
    this.searchString = '';
    this.isSearch = false;
    this.showSuggestions = false;
    this.page = 1;
    this.listGroup = [];
    this.listAllGroup = [];
    if (!this.isAllGroup) {
      this._getListGroup();
    } else {
      this._getListAllGroup();
    }
  }

  // Phase 2: Enhanced search methods
  onSearchInput() {
    if (this.searchString.length > 0) {
      this.showSuggestions = true;
      this._updateSearchSuggestions();
    } else {
      this.showSuggestions = false;
    }
  }

  private _updateSearchSuggestions() {
    // Get suggestions from recent searches and group names
    const allGroups = [...this.listGroup, ...this.listAllGroup, ...this.listGroupRelative];
    const groupNames = allGroups
      .filter(g => g.nameEn?.toLowerCase().includes(this.searchString.toLowerCase()))
      .map(g => g.nameEn)
      .slice(0, 3);

    const recentMatches = this.recentSearches
      .filter(s => s.toLowerCase().includes(this.searchString.toLowerCase()))
      .slice(0, 2);

    this.searchSuggestions = [...new Set([...recentMatches, ...groupNames])];
  }

  applySuggestion(suggestion: string) {
    this.searchString = suggestion;
    this.showSuggestions = false;
    this._addToRecentSearches(suggestion);
    this.searchGroup();
  }

  private _addToRecentSearches(searchTerm: string) {
    const searches = this.recentSearches.filter(s => s !== searchTerm);
    searches.unshift(searchTerm);
    this.recentSearches = searches.slice(0, 5);
    this._saveRecentSearches();
  }

  private _loadRecentSearches() {
    const saved = localStorage.getItem('groupRecentSearches');
    if (saved) {
      try {
        this.recentSearches = JSON.parse(saved);
      } catch {
        this.recentSearches = [];
      }
    }
  }

  private _saveRecentSearches() {
    localStorage.setItem('groupRecentSearches', JSON.stringify(this.recentSearches));
  }

  clearRecentSearches() {
    this.recentSearches = [];
    this._saveRecentSearches();
  }

  // Phase 2: Filter methods
  setFilter(filter: string) {
    this.activeFilter = filter;

    switch (filter) {
      case 'joined':
        this.isAllGroup = false;
        if (!this.listGroup.length) {
          this._getListGroup();
        }
        break;
      case 'suggested':
        this.isAllGroup = false;
        if (!this.listGroupRelative.length) {
          this._getListGroupRelative();
        }
        break;
      case 'all':
      default:
        this.isAllGroup = true;
        if (!this.listAllGroup.length) {
          this._getListAllGroup();
        }
        break;
    }

    this.contentButton = this.isAllGroup ? 'BUTTON.YOUR_GROUP' : 'BUTTON.ALL_GROUP';
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  // Phase 2: Format methods for display
  formatNumber(num: number): string {
    if (!num) return '0';
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }

  getLastActiveTime(dateString: string): string {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
    return `${Math.floor(diffDays / 30)}mo ago`;
  }
}
