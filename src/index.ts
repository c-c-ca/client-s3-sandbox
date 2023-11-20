import path from 'path';
import { config } from 'dotenv';

config({
  path: path.join(__dirname, '..', `.env.${process.env.NODE_ENV}`),
});

import { readFile } from 'fs/promises';
import { v4 as uuid } from 'uuid';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

async function main() {
  // a client can be shared by different commands.
  const client = new S3Client({
    region: process.env.REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const buffer = await readFile(
    path.join(__dirname, '..', 'images', 'code-snippet-screenshot.png')
  );

  const input = {
    Body: buffer,
    Bucket: process.env.BUCKET_NAME,
    Key: `screenshot-${uuid()}.png`,
  };

  const command = new PutObjectCommand(input);

  // async/await.
  try {
    const data = await client.send(command);
    console.log(data);
    // process data.
  } catch (error) {
    // error handling.
  } finally {
    // finally.
  }
}

main();
