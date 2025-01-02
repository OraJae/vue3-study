// import { S3Client } from "@aws-sdk/client-s3";

// const REGION = "local"; // 替换为你的区域
// const ENDPOINT = "http://192.168.31.139:8010"; // 替换为你的 NAS IP 和端口

// const s3Client = new S3Client({
//   region: REGION,
//   endpoint: ENDPOINT,
//   credentials: {
//     accessKeyId: "", // 留空
//     secretAccessKey: "", // 留空
//   },
// });

// export default s3Client;

import AWS from "aws-sdk";

// 配置 AWS SDK
const s3 = new AWS.S3({
  accessKeyId: "database:FTj3WChc95bdmgdtOto8",
  secretAccessKey: "TcYJDjPZ9sUzNOYS2IRQvuHdhqTNxg57",
  endpoint: "http://192.168.31.139:8010", // 例如：'https://<NAS_IP>:<port>'
  s3ForcePathStyle: true, // 启用路径样式
  signatureVersion: "v4", // 签名版本
});

export default s3