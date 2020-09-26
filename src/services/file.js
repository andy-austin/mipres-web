import XLSX from "xlsx";
import {addressing_headers} from "@/constants";

export const downloadFile = (extension, { nit, startDate, endDate }, data) => {
    const filename = `${nit}_Direccionamiento_${startDate}_${endDate}`;
    const content = XLSX.utils.json_to_sheet(data, {header: addressing_headers})
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, content, filename.slice(0, 30));
    XLSX.writeFile(workbook, `${filename}.${extension}`)
}