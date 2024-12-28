import { Client } from "../models/clientModel.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import { Vehicle } from "../models/vehicleModel.js";

//<============================================ADD VEHICLE==========================================>
const validateAndProcessDocument = async (
  docType,
  { renewDate, expiryDate, pdfFileCloud },
  newVehicleData,
  res
) => {
  // Add document details to newVehicleData
  if (renewDate && expiryDate && pdfFileCloud) {
    newVehicleData[docType] = {
      renewDate,
      expiryDate,
      pdf: {
        public_id: pdfFileCloud.public_id,
        url: pdfFileCloud.secure_url,
      },
    };
  }
};

const checkFileAndData = (renewDate, expiryDate, pdfFile) => {
  if (
    (renewDate && (!expiryDate || !pdfFile)) ||
    (expiryDate && (!renewDate || !pdfFile)) ||
    (pdfFile && (!renewDate || !expiryDate))
  ) {
    return false;
  }
};

export const addVehicle = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid client id" });
    }

    const client = await Client.findById(id);
    if (!client) {
      return res
        .status(404)
        .json({ success: false, error: "Client not found" });
    }

    const {
      vehicleNumber,
      taxRenewDate,
      taxExpiryDate,
      puccRenewDate,
      puccExpiryDate,
      rcRenewDate,
      rcExpiryDate,
      permitRenewDate,
      permitExpiryDate,
      insuranceRenewDate,
      insuranceExpiryDate,
      fitnessRenewDate,
      fitnessExpiryDate,
    } = req.body;
    if (!vehicleNumber) {
      return res.status(400).json({
        success: false,
        error: `Vehicle Number Required`,
      });
    }

    const {
      taxPdfFile,
      puccPdfFile,
      rcPdfFile,
      permitPdfFile,
      insurancePdfFile,
      fitnessPdfFile,
    } = req.files;

    if (
      !taxPdfFile &&
      !puccPdfFile &&
      !rcPdfFile &&
      !permitPdfFile &&
      !insurancePdfFile &&
      !fitnessPdfFile
    ) {
      return res.status(400).json({
        success: false,
        error: "Atlest one document is required",
      });
    }
    const taxValid = checkFileAndData(taxRenewDate, taxExpiryDate, taxPdfFile);
    const rcValid = checkFileAndData(rcRenewDate, rcExpiryDate, rcPdfFile);
    const puccValid = checkFileAndData(
      puccRenewDate,
      puccExpiryDate,
      puccPdfFile
    );
    const permitValid = checkFileAndData(
      permitRenewDate,
      permitExpiryDate,
      permitPdfFile
    );
    const insuranceValid = checkFileAndData(
      insuranceRenewDate,
      insuranceExpiryDate,
      insurancePdfFile
    );
    const fitnessValid = checkFileAndData(
      fitnessRenewDate,
      fitnessExpiryDate,
      fitnessPdfFile
    );

    if (
      taxValid === false ||
      puccValid === false ||
      rcValid === false ||
      permitValid === false ||
      insuranceValid === false ||
      fitnessValid === false
    ) {
      return res.status(400).json({
        success: false,
        error: `Incomplete document data.`,
      });
    }

    const taxPdfFileCloud = taxPdfFile
      ? await cloudinary.v2.uploader.upload(getDataUri(taxPdfFile[0]).content)
      : null;
    // console.log(getDataUri(taxPdfFile[0]));
    // console.log(taxPdfFileCloud);
    const puccPdfFileCloud = puccPdfFile
      ? await cloudinary.v2.uploader.upload(getDataUri(puccPdfFile[0]).content)
      : null;
    const rcPdfFileCloud = rcPdfFile
      ? await cloudinary.v2.uploader.upload(getDataUri(rcPdfFile[0]).content)
      : null;
    const permitPdfFileCloud = permitPdfFile
      ? await cloudinary.v2.uploader.upload(
          getDataUri(permitPdfFile[0]).content
        )
      : null;
    const insurancePdfFileCloud = insurancePdfFile
      ? await cloudinary.v2.uploader.upload(
          getDataUri(insurancePdfFile[0]).content
        )
      : null;
    const fitnessPdfFileCloud = fitnessPdfFile
      ? await cloudinary.v2.uploader.upload(
          getDataUri(fitnessPdfFile[0]).content
        )
      : null;

    const newVehicleData = {};

    // Validate and process each document
    const taxRes = await validateAndProcessDocument(
      "tax",
      {
        renewDate: taxRenewDate,
        expiryDate: taxExpiryDate,
        pdfFileCloud: taxPdfFileCloud,
      },
      newVehicleData,
      res
    );
    const puccRes = await validateAndProcessDocument(
      "pucc",
      {
        renewDate: puccRenewDate,
        expiryDate: puccExpiryDate,
        pdfFileCloud: puccPdfFileCloud,
      },
      newVehicleData,
      res
    );
    const rcRes = await validateAndProcessDocument(
      "rc",
      {
        renewDate: rcRenewDate,
        expiryDate: rcExpiryDate,
        pdfFileCloud: rcPdfFileCloud,
      },
      newVehicleData,
      res
    );
    const permitRes = await validateAndProcessDocument(
      "permit",
      {
        renewDate: permitRenewDate,
        expiryDate: permitExpiryDate,
        pdfFileCloud: permitPdfFileCloud,
      },
      newVehicleData,
      res
    );
    const insuranceRes = await validateAndProcessDocument(
      "insurance",
      {
        renewDate: insuranceRenewDate,
        expiryDate: insuranceExpiryDate,
        pdfFileCloud: insurancePdfFileCloud,
      },
      newVehicleData,
      res
    );
    const fitnessRes = await validateAndProcessDocument(
      "fitness",
      {
        renewDate: fitnessRenewDate,
        expiryDate: fitnessExpiryDate,
        pdfFileCloud: fitnessPdfFileCloud,
      },
      newVehicleData,
      res
    );

    // Add the new vehicle to the database

    const newVehicle = await Vehicle.create({
      vehicleNumber,
      ...newVehicleData,
      ownerID: client._id,
    });

    return res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
      newVehicle,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

//<==================================================UPDATE DOC===============================================>
export const updateDocument = async (req, res, next) => {
  try {
    const { vehicleId, docType, public_id } = req.query;
    const { renewDate, expiryDate } = req.body;

    if (!renewDate || !expiryDate) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }

    const {
      taxPdfFile,
      puccPdfFile,
      rcPdfFile,
      permitPdfFile,
      insurancePdfFile,
      fitnessPdfFile,
    } = req.files;

    let verifiedPdfFile;

    switch (docType) {
      case "pucc":
        verifiedPdfFile = puccPdfFile;
        break;
      case "rc":
        verifiedPdfFile = rcPdfFile;
        break;
      case "permit":
        verifiedPdfFile = permitPdfFile;
        break;
      case "tax":
        verifiedPdfFile = taxPdfFile;
        break;
      case "insurance":
        verifiedPdfFile = insurancePdfFile;
        break;
      case "fitness":
        verifiedPdfFile = fitnessPdfFile;
        break;
      default:
        verifiedPdfFile = null;
    }

    if (!verifiedPdfFile) {
      return res.status(400).json({
        success: false,
        error: "No PDF file uploaded for the selected document type.",
      });
    }

    const vehicleFound = await Vehicle.findById(vehicleId);
    if (!vehicleFound) {
      return res
        .status(404)
        .json({ success: false, error: "Vehicle not found" });
    }

    const verifiedPdfFileUri = getDataUri(verifiedPdfFile[0]);
    const verifiedPdfFileCloud = await cloudinary.v2.uploader.upload(
      verifiedPdfFileUri.content
    );

    if (public_id) {
      await cloudinary.v2.uploader.destroy(public_id);
    }

    // Ensure the docType property exists in the vehicleFound object
    if (!vehicleFound[docType]) {
      vehicleFound[docType] = {}; // Initialize the object if it doesn't exist
    }

    // Update the document properties dynamically
    vehicleFound[docType] = {
      renewDate,
      expiryDate,
      pdf: {
        public_id: verifiedPdfFileCloud.public_id,
        url: verifiedPdfFileCloud.url,
      },
    };

    await vehicleFound.save();

    return res.status(200).json({
      success: true,
      message: `${docType} updated successfully`,
      updatedVehicle: vehicleFound,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

//<====================================================CHECK EXPIRY DATE=======================================>
export const checkExpiryDate = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD
    const warningDate = new Date();
    warningDate.setDate(warningDate.getDate() + 7); // Date 7 days from today
    const warningDateStr = warningDate.toISOString().split("T")[0];

    const vehicles = await Vehicle.find().populate(
      "ownerID",
      "firstName lastName contactNo email"
    );

    let expiringDocs = [];

    if (!vehicles || vehicles.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No vehicles found", expiringDocs });
    }

    vehicles.forEach((vehicle) => {
      if (vehicle) {
        ["tax", "pucc", "rc", "insurance", "fitness", "permit"].forEach(
          (docType) => {
            if (vehicle[docType]) {
              const doc = vehicle[docType];
              const snoozedUntil = doc.snoozedUntil || null;

              if (
                doc.expiryDate <= warningDateStr &&
                doc.expiryDate > today && // Not expired yet
                (!snoozedUntil || snoozedUntil <= today) // Not snoozed or snooze expired
              ) {
                expiringDocs.push({
                  _id: vehicle._id,
                  docType,
                  expiryDate: doc.expiryDate,
                  vehicleNumber: vehicle.vehicleNumber,
                  ownerID: vehicle.ownerID?._id || null, // Check if ownerID exists
                  firstName: vehicle.ownerID?.firstName || "N/A",
                  lastName: vehicle.ownerID?.lastName || "N/A",
                  contactNumber: vehicle.ownerID?.contactNo || "N/A",
                  email: vehicle.ownerID?.email || "N/A",
                });
              }
            }
          }
        );
      }
    });

    return res.status(200).json({
      success: true,
      message: "Notification for expiring documents",
      expiringDocs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Error checking for expiry documents",
    });
  }
};

//<=================================================SNOOZE NOTIFICATION=================================>
export const snoozeNotification = async (req, res) => {
  try {
    const { vehicleId, docType } = req.query;

    if (!vehicleId || !docType) {
      return res
        .status(400)
        .json({ error: "Vehicle ID and document type are required" });
    }

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    const doc = vehicle[docType];

    if (!doc) {
      return res.status(400).json({ error: "Invalid document type" });
    }

    // Calculate snooze date (2 days from today)
    const today = new Date();
    today.setDate(today.getDate() + 2);
    const snoozedUntil = today.toISOString().split("T")[0];

    doc.snoozedUntil = snoozedUntil;

    await vehicle.save();

    res.status(200).json({
      success: true,
      message: `${docType} notifications snoozed until ${snoozedUntil}`,
    });
  } catch (error) {
    console.error("Error snoozing notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//<================================GET VEHICLES OF SINGLE CLIENT======================>
export const getSingleClientVehicle = async (req, res) => {
  try {
    const { clientId } = req.query;

    if (!clientId) {
      return res.status(400).json({ error: "client ID  required" });
    }

    const clientFound = await Client.findById(clientId);
    // console.log(clientFound);

    if (!clientFound) {
      return res.status(404).json({ error: "Client not found" });
    }

    const vehicles = await Vehicle.find({ ownerID: clientId });
    // console.log(vehicles);

    res.status(200).json({
      success: true,
      vehicles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
