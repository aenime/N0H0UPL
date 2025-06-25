import mongoose, { Schema, Document } from 'mongoose';

export interface IImage extends Document {
  url: string;
  sourceUrl: string;
  altText?: string;
  width?: number;
  height?: number;
  localPath?: string;
  fileName?: string;
  fileSize?: number;
  contentType?: string;
  scrapedAt: Date;
}

const ImageSchema: Schema = new Schema({
  url: { type: String, required: true },
  sourceUrl: { type: String, required: true },
  altText: String,
  width: Number,
  height: Number,
  localPath: String,
  fileName: String,
  fileSize: Number,
  contentType: String,
  scrapedAt: { type: Date, default: Date.now }
});

export default mongoose.models.Image || mongoose.model<IImage>('Image', ImageSchema);
