import mongoose, { Schema, Document, Model } from "mongoose";

interface CustomerDoc extends Document {
    email: string;
    password: string;
    salt: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    verified: boolean;
    otp: number;
    otp_expire: Date;
    lat: number;
    long: number;
}

const CustomerSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    address: { type: String },
    phone: { type: String, required: true },
    verified: { type: Boolean, required: true },
    otp: { type: Number, required: true },
    otp_expire: { type: Date, required: true },
    lat: { type: Number },
    long: { type: Number },
}, {
    toJSON: {
        transform(doc, res) {
            delete res.password,
                delete res.salt,
                delete res.__v,
                delete res.createdAt,
                delete res.updatedAt
        }
    },
    timestamps: true
});

const Customer = mongoose.model<CustomerDoc>('customer', CustomerSchema);
export { Customer }