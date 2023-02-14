import environment from "@config/environment";
import { S3Client, DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import AppError from "@shared/utils/AppError";

if (!environment.aws_access_key_id || !environment.aws_s3_seccret_access_key) {
  throw new AppError("AWS access key and secret not set", 400);
}

if (!process.env.AWS_ACCESS_KEY_ID) throw new Error("AWS_ACCESS_KEY_ID not set");

if (!process.env.AWS_SECRET_ACCESS_KEY) throw new Error("AWS_SECRET_ACCESS_KEY not set");

if (!process.env.AWS_REGION) throw new Error("AWS_REGION");

if (!process.env.AWS_S3_BUCKET) throw new Error("AWS_S3_BUCKET not set");

export const s3Config = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: environment.aws_access_key_id,
    secretAccessKey: environment.aws_s3_seccret_access_key,
  },
});

export const uploadFile = async (buffer: Buffer, params: { key: string; metadata: any }) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: params.key,
    Body: buffer,
    Metadata: params.metadata,
  });
  const object = await s3Config.send(command);

  return object;
};

export const getFile = async (uri: string) => {
  const object = await s3Config.send(
    new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: uri,
    })
  );

  return object.Body;
};

export const deleteFile = (key: string) =>
  s3Config.send(
    new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
    })
  );
