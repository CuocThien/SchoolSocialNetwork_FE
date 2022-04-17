const SERVER_HOST = 'https://schoolsocialnetwork.herokuapp.com'
const LOCAL_HOST = 'http://localhost:3000'
const HOST = SERVER_HOST

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
export { HOST, LIST_ROLE }