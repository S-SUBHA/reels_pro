import mongoose, { Schema, model, models } from "mongoose";

// define the video dimentions information
const VIDEO_DIMENTIONS = {
  height: 1920,
  width: 1080,
};

// create an interface for videos
export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  transformation?: {
    height: number;
    width: number;
    quality?: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// create the video schema
const videoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    transformation: {
      height: {
        type: Number,
        default: VIDEO_DIMENTIONS.height,
      },
      width: {
        type: Number,
        default: VIDEO_DIMENTIONS.width,
      },
      quality: {
        type: Number,
        min: 1,
        max: 100,
      },
    },
  },
  { timestamps: true }
);

// create the video-model
const Video = models?.Video || model<IVideo>("Video", videoSchema);

// export the video-model
export { Video };
