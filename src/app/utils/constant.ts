const SERVER_HOST = 'https://schoolsocialnetwork.herokuapp.com'
const LOCAL_HOST = 'http://54.169.230.175:3000'
const HOST = LOCAL_HOST

const LIST_ROLE = [
    {
        roleId: 1,
        nameEn: "Admin",
        nameVi: "Quản trị viên"
    },
    {
        roleId: 2,
        nameEn: "Dean",
        nameVi: "Trưởng khoa"
    },
    {
        roleId: 3,
        nameEn: "Teacher",
        nameVi: "Giảng viên"
    },
    {
        roleId: 4,
        nameEn: "Student",
        nameVi: "Sinh viên"
    }
]

const OBJ_ROUTE_NAV = {
    'index': {
        route: 'home/index',
        nameEn: 'Index',
        nameVi: 'Trang chủ'
    },
    'new-feed': {
        route: 'home/new-feed',
        nameEn: 'New feed',
        nameVi: 'Bảng tin'
    },
    'group': {
        route: 'home/group',
        nameEn: 'Group',
        nameVi: 'Nhóm'
    },
    'enterprise': {
        route: 'home/enterprise',
        nameEn: 'Enterprise',
        nameVi: 'Doanh nghiệp'
    },
    'manage': {
        route: '',
        nameEn: 'Manage',
        nameVi: 'Quản lý'
    },
    'account': {
        route: '',
        nameEn: 'Users',
        nameVi: 'Người dùng'
    },
    'sign-up': {
        route: 'home/sign-up',
        nameEn: 'Sign up',
        nameVi: 'Đăng ký'
    },
    'users': {
        route: 'home/users',
        nameEn: 'Members',
        nameVi: 'Thành viên'
    },
    'information': {
        route: 'home/account',
        nameEn: 'Users Information',
        nameVi: 'Thông tin người dùng'
    },
    'sub-enterprise': {
        route: '',
        nameEn: 'Enterprise',
        nameVi: 'Doanh nghiệp'
    },
    'register-enterprise': {
        route: 'home/register-enterprise',
        nameEn: 'Register',
        nameVi: 'Đăng ký'
    },
    'recruitment-news': {
        route: 'home/recruitment-news',
        nameEn: 'Company',
        nameVi: 'Công ty'
    },
    'faculty': {
        route: 'home/faculty',
        nameEn: 'Faculty',
        nameVi: 'Khoa'
    },
    'category': {
        route: 'home/category',
        nameEn: 'Category',
        nameVi: 'Danh mục'
    },
    'report': {
        route: '',
        nameEn: 'Report',
        nameVi: 'Báo cáo'
    },
    'report/group': {
        route: 'home/report/group',
        nameEn: 'Groups',
        nameVi: 'Nhóm'
    },
    'report/post': {
        route: 'home/report/post',
        nameEn: 'Post',
        nameVi: 'Bài viết'
    }
}


const LIST_CATEGORY_POST = [
    {
        "_id": "62711c4f442b05ae533b8b7a",
        "nameEn": "Study",
        "nameVi": "Học vụ",
        "isDelete": false,
    },
    {
        "_id": "62711c71442b05ae533b8c6d",
        "nameEn": "Union",
        "nameVi": "Đoàn - Hội",
        "isDelete": false,
    },
    {
        "_id": "62711c84442b05ae533b8cf1",
        "nameEn": "English",
        "nameVi": "Anh văn đầu ra",
        "isDelete": false,
    },
    {
        "_id": "62711cb8442b05ae533b8e60",
        "nameEn": "Common",
        "nameVi": "Chung",
        "isDelete": false,
    },
    {
        "_id": "62711d2f442b05ae533b919d",
        "nameEn": "Tuition ",
        "nameVi": "Học phí",
        "isDelete": false,
    },
    {
        "_id": "62712024442b05ae533ba622",
        "nameEn": "Scholarship ",
        "nameVi": "Học bổng",
        "isDelete": false,
    }
]

const LIST_EXPERIENCE = [
    {
        "id": "1",
        "nameEn": "No experience required",
        "nameVi": "Không yêu cầu kinh nghiệm",
    },
    {
        "id": "2",
        "nameEn": "Less than 1 year",
        "nameVi": "Dưới 1 năm",
    },
    {
        "id": "3",
        "nameEn": "1 - 2 years",
        "nameVi": "1 - 2 năm",
    },
    {
        "id": "4",
        "nameEn": "2 - 3 years",
        "nameVi": "2 - 3 năm",
    },
    {
        "id": "5",
        "nameEn": "More than 3 years",
        "nameVi": "Hơn 3 năm",
    },
]
export { HOST, LIST_ROLE, OBJ_ROUTE_NAV, LIST_CATEGORY_POST, LIST_EXPERIENCE }