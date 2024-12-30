import { Client } from "../models/clientModel.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";
import { Vehicle } from "../models/vehicleModel.js";

//<==========================================================ADD NEW CLIENT=========================================>
export const addNewClient = async (req, res, next) => {
  try {
    const { firstName, lastName, gender, dob, contactNo, address } = req.body;

    const { panCard, adharCard } = req.files;
    // console.log(panCard);
    const panCardUri = getDataUri(panCard[0]);
    const adharCardUri = getDataUri(adharCard[0]);

    if (
      !firstName ||
      !lastName ||
      !gender ||
      !dob ||
      !contactNo ||
      !address ||
      !panCard ||
      !adharCard
    ) {
      return res
        .status(400)
        .json({ success: false, error: "Enter all fields" });
    }

    let client;

    client = await Client.findOne({
      contactNo,
    });

    if (client) {
      return res
        .status(400)
        .json({ success: false, error: "Contact no already exist" });
    }

    //upload file on cloudinary
    const panCardCloud = await cloudinary.v2.uploader.upload(
      panCardUri.content
    );
    const adharCardCloud = await cloudinary.v2.uploader.upload(
      adharCardUri.content
    );

    // console.log(panCard);

    if (!panCardCloud) {
      await cloudinary.v2.uploader.destroy(adharCardCloud.public_id);
      return res.status(500).json({
        success: false,
        error: "File uploading fail, Try again later",
      });
    }
    if (!adharCardCloud) {
      await cloudinary.v2.uploader.destroy(panCardCloud.public_id);
      return res.status(500).json({
        success: false,
        error: "File uploading fail, Try again later",
      });
    }

    const clientNew = await Client.create({
      firstName,
      lastName,
      gender,
      dob,
      contactNo,
      address,
      panCard: {
        public_id: panCardCloud.public_id,
        url: panCardCloud.secure_url,
      },
      adharCard: {
        public_id: adharCardCloud.public_id,
        url: adharCardCloud.secure_url,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Client added successfully",
      clientNew,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

//<==========================================================GET All CLIENTS=========================================>
export const getAllClients = async (req, res, next) => {
  try {
    let clients = [];
    clients = await Client.find();
    return res.status(200).json({
      success: true,
      message: "Clients fetched successfully",
      clients,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internel server error" });
  }
};
//<==========================================================SEARCH CLIENT=========================================>
export const searchClients = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res
        .status(400)
        .json({ success: false, error: "Query is required" });
    }

    let searchCriteria;

    // Detect the type of query
    if (/^\d{10}$/.test(query)) {
      // Query is a phone number (assumes 10-digit format)
      searchCriteria = { contactNo: query };
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(query)) {
      // Query is an email (basic email regex)
      searchCriteria = { email: query };
    } else if (/^[A-Z]{2}\d{1,2}[A-Z]{1,2}\d{4}$/.test(query)) {
      // Query is a vehicle number (assumes Indian vehicle number format)
      searchCriteria = { "vehicles.vehicleNumber": query };
    } else {
      // Query is treated as a name
      searchCriteria = {
        $or: [
          { firstName: { $regex: query, $options: "i" } },
          { lastName: { $regex: query, $options: "i" } },
        ],
      };
    }

    const clients = await Client.find(searchCriteria);

    if (clients.length === 0) {
      return res
        .status(404)
        .json({ success: false, error: "No clients found" });
    }

    return res.status(200).json({ success: true, clients });
  } catch (error) {
    console.error("Error searching clients:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};

//<==========================================================DELETE CLIENT=========================================>
export const deleteClient = async (req, res, next) => {
  try {
    const { clientId } = req.query;
    const client = await Client.findById(clientId);

    if (!client) {
      return res
        .status(404)
        .json({ success: false, error: "Client Not Found" });
    }

    const vehicles = await Vehicle.find({ ownerID: client._id });

    for (let vehicle of vehicles) {
      // Iterate over the possible document types
      for (let doc of ["tax", "pucc", "permit", "rc", "insurance", "fitness"]) {
        const document = vehicle[doc];
        if (document && document.pdf && document.pdf.public_id) {
          try {
            // Destroy the document in Cloudinary if it exists
            await cloudinary.v2.uploader.destroy(document.pdf.public_id);
          } catch (error) {
            console.error(
              `Failed to destroy ${doc} document for vehicle ${vehicle.vehicleNumber}:`,
              error
            );
          }
        }
      }

      try {
        await vehicle.deleteOne();
      } catch (error) {
        console.error(
          `Failed to delete vehicle ${vehicle.vehicleNumber}:`,
          error
        );
      }
    }

    for (let doc of ["panCard", "adharCard"]) {
      if (client[doc]) {
        await cloudinary.v2.uploader.destroy(client[doc].public_id);
      }
    }

    await client.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: `Client ${client.firstName} deleted` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
