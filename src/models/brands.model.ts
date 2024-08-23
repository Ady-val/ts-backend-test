import { Document, Model, Schema, model } from 'mongoose';

interface BrandAttr {
  name: string;
}

interface BrandDocument extends Document {
  name: string;
}

interface BrandModel extends Model<BrandDocument> {
  build(attr: BrandAttr): BrandDocument;
}

const brandSchema = new Schema<BrandDocument, BrandModel>(
  {
    name: { type: String, required: true, unique: true }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
      }
    }
  }
);

brandSchema.statics.build = (attr: BrandAttr): BrandDocument => {
  return new Brand(attr);
};

const Brand = model<BrandDocument, BrandModel>('brands', brandSchema);

export { Brand };
