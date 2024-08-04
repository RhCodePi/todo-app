import { Bucket, connect, Collection, Scope } from "couchbase";
import *as dotenv from "dotenv"

dotenv.config()

export async function getCouchbaseConnection() {
  const cluster = await connect(process.env.COUCHBASE_CONNECT, {
    username: process.env.COUCHBASE_USERNAME,
    password: process.env.COUCHBASE_PASSWORD,
  });

  const bucket: Bucket = cluster.bucket(process.env.COUCHBASE_BUCKET);
  const defaultScope: Scope = bucket.defaultScope();
  const users: Collection = defaultScope.collection(process.env.COUCHBASE_COLLECTION);
  const deletedTodos: Collection = defaultScope.collection(process.env.COUCHBASE_COLLECTION_DELETED_TODO)

  return {
    users,
    deletedTodos,
    cluster,
  };
}