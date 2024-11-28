import { z } from "zod";

export const schoolsValidate = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .max(45)
      .min(10, "Name should be more than 9 characters")
      .trim(),
    address: z
      .string({ required_error: "Address is required" })
      .max(100)
      .min(10, "Address must be more than 9 characters.")
      .trim(),
    latitude: z.preprocess(
      (value) => (value === undefined ? undefined : Number(value)),
      z
        .number({ required_error: "Latitude is required" })
        .min(-90)
        .max(90, "Invalid latitude")
    ),
    longitude: z.preprocess(
      (value) => (value === undefined ? undefined : Number(value)),
      z
        .number({ required_error: "Longitude is required" })
        .min(-180)
        .max(180, "Invalid longitude")
    ),
  })
  .strict();

export const geoValidate = z
  .object({
    latitude: z.preprocess(
      (value) => (value === undefined ? undefined : Number(value)),
      z
        .number({ required_error: "Latitude is required" })
        .min(-90)
        .max(90, "Invalid latitude")
    ),
    longitude: z.preprocess(
      (value) => (value === undefined ? undefined : Number(value)),
      z
        .number({ required_error: "Longitude is required" })
        .min(-180)
        .max(180, "Invalid longitude")
    ),
  })
  .strict();
