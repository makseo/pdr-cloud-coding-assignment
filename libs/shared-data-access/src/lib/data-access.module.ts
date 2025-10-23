import { Module } from "@nestjs/common";
import { FileStorageService } from "./file-storage/file-storage.service";
import { WriteQueueService } from "./write-queue/write-queue.service";

@Module({
  providers: [FileStorageService, WriteQueueService],
  exports: [FileStorageService, WriteQueueService],
})
export class DataAccessModule {}
