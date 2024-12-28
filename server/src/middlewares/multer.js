import multer from "multer";

const storage = multer.memoryStorage();

// Define fields for multiple uploads
export const uploadCards = multer({ storage: storage }).fields([
  { name: "panCard", maxCount: 1 }, // For single file
  { name: "adharCard", maxCount: 1 }, // For single file ===> for multiple file update maxCount
]);

export const uploadVehicleDoc = multer({ storage: storage }).fields([
  { name: "taxPdfFile", maxCount: 1 },
  { name: "puccPdfFile", maxCount: 1 },
  { name: "rcPdfFile", maxCount: 1 },
  { name: "permitPdfFile", maxCount: 1 },
  { name: "insurancePdfFile", maxCount: 1 },
  { name: "fitnessPdfFile", maxCount: 1 },
]);
