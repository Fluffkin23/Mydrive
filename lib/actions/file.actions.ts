"use server";

import {
  DeleteFileProps,
  GetFilesProps,
  RenameFileProps,
  UpdateFileUsersProps,
  UploadFileProps,
} from "@/types";
import { createAdminClient } from "@/lib/appwrite";
import { InputFile } from "node-appwrite/file";
import { appWriteConfig } from "@/lib/appwrite/config";
import { ID, Query, Models } from "node-appwrite";
import { constructFileUrl, getFileType, parseStringify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/actions/user.actions";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};

export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path,
}: UploadFileProps) => {
  const { storage, databases } = await createAdminClient();

  console.log("Received upload request with:", {
    file,
    ownerId,
    accountId,
    path,
  });

  try {
    // Convert file to InputFile format
    const inputFile = InputFile.fromBuffer(file, file.name);
    console.log("Input file created:", inputFile);

    // Upload file to storage bucket
    const bucketFile = await storage.createFile(
      appWriteConfig.bucketId,
      ID.unique(),
      inputFile,
    );
    console.log("File uploaded to bucket:", bucketFile);

    // Prepare the file document
    const fileType = getFileType(bucketFile.name);
    console.log("File type details:", fileType);

    const fileDocument = {
      type: fileType.type,
      name: bucketFile.name,
      url: constructFileUrl(bucketFile.$id),
      extension: fileType.extension,
      size: bucketFile.sizeOriginal,
      owner: ownerId,
      accountId,
      users: [],
      bucketFileId: bucketFile.$id,
    };
    console.log("File document prepared:", fileDocument);

    // Create the file document in the database
    const newFile = await databases
      .createDocument(
        appWriteConfig.databaseId,
        appWriteConfig.filesCollectionId,
        ID.unique(),
        fileDocument,
      )
      .catch(async (error: unknown) => {
        console.error("Error while creating file document:", error);
        // Delete the file from storage in case of database error
        await storage.deleteFile(appWriteConfig.bucketId, bucketFile.$id);
        handleError(error, "Failed to create a file document");
      });

    console.log("New file document created:", newFile);

    // Revalidate the path
    if (path) {
      console.log("Revalidating path:", path);
      revalidatePath(path);
    }

    return parseStringify(newFile);
  } catch (error) {
    console.error("Error in uploadFile function:", error);
    handleError(error, "Failed to upload files");
  }
};

const createQueries = (
  currentUser: Models.Document,
  types: string[],
  searchText: string,
  sort: string,
  limit?: number,
) => {
  const queries = [
    Query.or([
      Query.equal("owner", [currentUser.$id]),
      Query.contains("users", [currentUser.email]),
    ]),
  ];

  if (types.length > 0) queries.push(Query.equal("type", types));
  if (searchText) queries.push(Query.contains("name", searchText));
  if (limit) queries.push(Query.limit(limit));

  if (sort) {
    const [sortBy, orderBy] = sort.split("-");
    queries.push(
      orderBy === "asc" ? Query.orderAsc(sortBy) : Query.orderDesc(sortBy),
    );
  }
  console.log(queries);

  return queries;
};

export const getFiles = async ({
  types = [],
  searchText = "",
  sort = "$createdAt-desc",
  limit,
}: GetFilesProps) => {
  const { databases } = await createAdminClient();

  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("User not found!");

    const queries = createQueries(currentUser, types, searchText, sort, limit);
    console.log({ currentUser, queries });

    const files = await databases.listDocuments(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      queries,
    );
    console.log({ files });

    return parseStringify(files);
  } catch (error) {
    handleError(error, "Failed to get files");
  }
};

export const renameFile = async ({
  fileId,
  name,
  extension,
  path,
}: RenameFileProps) => {
  const { databases } = await createAdminClient();

  try {
    const newName = `${name}.${extension}`;
    const updatedFile = await databases.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      fileId,
      { name: newName },
    );
    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (error) {
    handleError(error, "Failed to rename file");
  }
};

export const updateFileUsers = async ({
  fileId,
  emails,
  path,
}: UpdateFileUsersProps) => {
  const { databases } = await createAdminClient();

  try {
    const updatedFile = await databases.updateDocument(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      fileId,
      { users: emails },
    );
    revalidatePath(path);
    return parseStringify(updatedFile);
  } catch (error) {
    handleError(error, "Failed to update the  users");
  }
};

export const deleteFile = async ({
  fileId,
  bucketFileId,
  path,
}: DeleteFileProps) => {
  const { databases, storage } = await createAdminClient();

  try {
    const deletedFile = await databases.deleteDocument(
      appWriteConfig.databaseId,
      appWriteConfig.filesCollectionId,
      fileId,
    );

    if (deletedFile) {
      await storage.deleteFile(appWriteConfig.bucketId, bucketFileId);
    }

    revalidatePath(path);
    return parseStringify({ status: "success" });
  } catch (error) {
    handleError(error, "Failed to delete the  file");
  }
};
