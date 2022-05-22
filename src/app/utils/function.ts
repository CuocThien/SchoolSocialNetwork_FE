import * as moment from "moment"
import * as XLSX from 'xlsx'
import FileSaver from 'file-saver'
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

function getDaysToNow(date) {
    return Math.ceil(moment.duration(moment().diff(moment(date))).asDays())
}
function exportAsExcelFile(data: any[], logs: any[], excelFileName: string): Promise<Object> {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const worksheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(logs);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet, 'logs': worksheet2 }, SheetNames: ['data', 'logs'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    return (saveAsExcelFile(excelBuffer, excelFileName));
}
function saveAsExcelFile(buffer: any, fileName: string): Promise<Object> {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    return FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
}
export { getDaysToNow, exportAsExcelFile, saveAsExcelFile }