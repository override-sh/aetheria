import { z } from "zod";
import mongoose from "mongoose";

export const MongoIdSchema = z.custom<string>(
	(value) => {
		if (typeof value !== "string") {
			return false;
		}

		return mongoose.Types.ObjectId.isValid(value);
	},
	{
		message: "Invalid identifier.",
	},
	true,
);