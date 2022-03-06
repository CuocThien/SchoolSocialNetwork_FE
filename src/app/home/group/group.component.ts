import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['../../../assets/sass/main.scss']
})
export class GroupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fileUpload(event: any) {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      let workBook = XLSX.read(binaryData, { type: 'binary' })
      let data = {}
      workBook.SheetNames.forEach(sheet => {
        Object.assign(data, XLSX.utils.sheet_to_json(workBook.Sheets[sheet]));
      })
    }
  }

}
