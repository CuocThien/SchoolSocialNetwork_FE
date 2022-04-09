
export interface Account {
  _id: String,
  password: String,
  roleId: Number,
  isAdminSG: Boolean,
  isDelete: Boolean,
  deletedDate: Date,
}