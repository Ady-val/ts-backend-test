import { Document, Model, Schema, model } from 'mongoose';

interface BrandModelsAttr {
  name: string;
  average_price?: number;
  brand_name: string;
}

interface BrandModelsDocument extends Document {
  name: string;
  average_price?: number;
  brand_name: string;
}

interface BrandModelsModel extends Model<BrandModelsDocument> {
  build(attr: BrandModelsAttr): BrandModelsDocument;
}

const brandSchema = new Schema<BrandModelsDocument, BrandModelsModel>(
  {
    name: { type: String, required: true },
    average_price: { type: Number, required: true },
    brand_name: { type: String, required: false }
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

brandSchema.index({ brand_name: 1 });

brandSchema.statics.build = (attr: BrandModelsAttr): BrandModelsDocument => {
  return new BrandModels(attr);
};

const BrandModels = model<BrandModelsDocument, BrandModelsModel>('brands-models', brandSchema);

export { BrandModels };
