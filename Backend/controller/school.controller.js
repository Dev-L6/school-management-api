import { schoolsValidate, geoValidate } from "../utils/inputValidation.js";
import { db } from "../config/db.js";
import { distanceBtwCoordinates } from "../utils/Distance.js";

//add school controller
export const addSchool = async (req, res) => {
  try {
    const body = req.body;
    console.log(req.body);

    const validateData = schoolsValidate.safeParse(body);

    if (!validateData.success) {
      const errorMessages = validateData.error.errors.map((error) => {
        return {
          message: error.message,
          path: error.path[0],
          code: error.code,
        };
      });
      return res.status(400).json({ error: errorMessages });
    }
    const { name, address, latitude, longitude } = validateData.data;

    const insertQuery = `INSERT INTO schools (name, address, latitude, longitude) VALUES (? ,? ,? ,?)`;

    const [response] = await db.query(insertQuery, [
      name,
      address,
      latitude,
      longitude,
    ]);

    res.status(200).json({
      message: "School added successfully!",
      success: true,
      response: response.insertId,
    });
  } catch (error) {
    console.log("Some error occurred:", error.message);
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ message: "School already exists!", success: false });
    }
    res.status(500).json({
      message: "Internal Server Error ",
      success: false,
      error: error.message,
    });
  }
};

//list schools controller
export const listSchools = async (req, res) => {
  try {
    const validateData = geoValidate.safeParse(req.query);

    if (!validateData.success) {
      const errorMessages = validateData.error.errors.map((error) => {
        return { error: error.message, path: error.path[0], code: error.code };
      });

      return res.status(404).json({ error: errorMessages });
    }

    const { latitude, longitude } = validateData.data;

    const [schools] = await db.query(`SELECT* FROM schools`);

    if (schools.length === 0) {
      return res
        .status(404)
        .json({ message: "No School present", success: false });
    }

    const schoolsDistance = schools.map((school) => {
      const distance = distanceBtwCoordinates(
        latitude,
        longitude,
        school.latitude,
        school.longitude
      );
      return { ...school, distance };
    });

    const sortedSchools = schoolsDistance.sort(
      (a, b) => a.distance - b.distance
    );

    res.status(200).json({
      message: "Schools fetched successfully!",
      success: true,
      data: sortedSchools,
    });
  } catch (error) {
    console.log(
      "Some error occurred while fetching school list",
      error.message
    );
    res
      .status(500)
      .json({
        message: "Internal Server error" || "Error fetching Schools list",
        success: false,
        error: error.message,
      });
  }
};
