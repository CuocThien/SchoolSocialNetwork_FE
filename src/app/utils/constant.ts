const SERVER_HOST = 'https://schoolsocialnetwork.herokuapp.com'
const LOCAL_HOST = 'http://localhost:3000'
const HOST = LOCAL_HOST

const LIST_ROLE = {
    1: {
        nameEn: "Admin",
        nameVi: "Quản trị viên"
    },
    2: {
        nameEn: "Dean",
        nameVi: "Trưởng khoa"
    },
    3: {
        nameEn: "Teacher",
        nameVi: "Giảng viên"
    },
    4: {
        nameEn: "Student",
        nameVi: "Sinh viên"
    }
}
export { HOST, LIST_ROLE }