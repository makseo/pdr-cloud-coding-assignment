import { Injectable } from "@nestjs/common";
import {
  BaseRepository,
  FileStorageService,
  RepositoryOptions,
  WriteQueueService,
} from "@pdr-cloud/shared-data-access";
import { User } from "@pdr-cloud/shared";

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(fileStorage: FileStorageService, writeQueue: WriteQueueService) {
    const options: RepositoryOptions = {
      dataDir: "data",
      fileName: "users.json",
    };
    super(fileStorage, writeQueue, options);
  }

  protected generateNextId(): number {
    return this.items.reduce((maxId, user) => Math.max(maxId, user.id), 0) + 1;
  }
}
