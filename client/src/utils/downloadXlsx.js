import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const downloadAllClientsData = (clients) => {
  // Step 1: Format the data
  const formattedData = clients.map((client) => ({
    "First Name": client.firstName,
    "Last Name": client.lastName,
    Gender: client.gender,
    DOB: client.dob,
    "Contact No": client.contactNo,
    Address: client.address,
    Vehicles: client.vehicles.map((v) => v.vehicleNumber).join(", "), // Convert array of vehicles into a string
    "Aadhaar Card": client.adharCard.url,
    "Pan Card": client.panCard.url,
  }));

  // Step 2: Convert data to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  // Step 3: Create a workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "All Clients");

  // Step 4: Write the workbook and save as file
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const file = new Blob([excelBuffer], { type: "application/octet-stream" });

  // Step 5: Trigger file download
  saveAs(file, "All_Clients_Data.xlsx");
};
