import * as mongoose from "mongoose";

/**
 * Mongoose ID
 */
export interface MongoseId {
	_id: mongoose.Types.ObjectId;
}