import environment from "@config/environment";
import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";
import AppError from "@shared/utils/AppError";

if (!environment.aws_access_key_id || !environment.aws_s3_seccret_access_key) {
  throw new AppError("AWS access key and secret not set", 400);
}

const s3Config = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: environment.aws_access_key_id,
    secretAccessKey: environment.aws_s3_seccret_access_key,
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

export const upload = multer({
  // dest: "assets/",
  storage: multerS3({
    s3: s3Config,
    bucket: `${environment.s3_bucket_name}`,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      //   var newFileName = Date.now() + "-" + file.originalname;
      //   var fullPath = "product/" + newFileName;
      //   cb(null, fullPath);
      cb(null, { fieldName: file.fieldname, fileName: `${file.originalname}` });
    },
    key: function (req, file, cb) {
      cb(null, "products" + "/" + file.originalname);
      //   cb(null, Date.now().toString());
    },
  }),
});
