import mongoose, { Document, Model, Schema } from 'mongoose';

// Define your user document interface.
export interface IUser extends Document {
    email: string;
    password: string;
}

// Extend the Model interface with your custom static method.
export interface IUserModel extends Model<IUser> {
    findByEmail(email: string): Promise<IUser | null>;
}

const userSchema: Schema<IUser> = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Attach the static method to the schema.
userSchema.statics.findByEmail = function (email: string) {
    return this.findOne({ email });
};

// Create the model with the extended type.
const UserModel = mongoose.model<IUser, IUserModel>('User', userSchema);

export default UserModel;
