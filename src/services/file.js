import XLSX from "xlsx";
import {addressing_headers} from "@/constants";

export const downloadFile = (extension, nit, data) => {
    const filename = `${nit}_Direccionamiento_${data.startDate}_${data.endDate}`;
    const content = XLSX.utils.json_to_sheet(data, {header: addressing_headers})
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, content, filename);
    XLSX.writeFile(workbook, `${filename}.${extension}`)
}