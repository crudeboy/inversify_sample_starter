import dotenv from "dotenv";
dotenv.config();

export default {
  // app config
  appName: process.env.APP_NAME || "Boilerplate",
  port: process.env.PORT || "3000",
  environment: process.env.NODE_ENV || "development",
  secretKey: process.env.SECRET_KEY || "",

  // jwt config
  saltRounds: process.env.SALT_ROUNDS || 10,
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || "03afc0820d376f9fdb1e8faa460902c6f74705feb01f101c480f4205964e3e10",
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || "7bfd6e6512e8ac8b56e31cfbdbe767892a87075039d4a524b2b2ddcb2fb2c69f",

  // redis config
  redisHost: process.env.REDIS_HOST || "redis",
  redisPort: process.env.REDIS_PORT || "6379",

  // database config DEVELOPMENT
  DEV_DATABASE_URL: process.env.DEV_DATABASE_URL || "postgres://etatxyrm:4AAF4cv-XIMKPPE12c-izplKT51HMr_e@peanut.db.elephantsql.com/etatxyrm",
  // dbHost: process.env.DB_HOST || "localhost",
  // dbPort: process.env.DB_PORT || "5432",
  // dbUsername: process.env.DB_USERNAME || "lakeman",
  // dbPassword: process.env.POSTGRES_ROOT_PASSWORD || "",
  // dbName: process.env.MYSQL_DATABASE || "crea8tive_revolution",

  //PRODUCTION
  PROD_DATABASE_URL: process.env.DEV_DATABASE_URL || "postgres://etatxyrm:4AAF4cv-XIMKPPE12c-izplKT51HMr_e@peanut.db.elephantsql.com/etatxyrm",

  //email data
  email_user: process.env.MAIL_EMAIL,
  email_password: process.env.MAIL_PASSWORD,

  //s3 credentials
  aws_access_key_id: process.env.AWS_S3_ACCESS_KEY_ID,
  aws_s3_seccret_access_key: process.env.AWS_S3_SECRET_ACCESS_KEY,
  s3_bucket_name: process.env.S3_BUCKET_NAME || "staging-bucket"
};
