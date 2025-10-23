import { Injectable, Logger } from "@nestjs/common";
import { FileStorageOptions, FileStorageService } from "../file-storage/file-storage.service";
import { WriteQueueService } from "../write-queue/write-queue.service";

export type RepositoryOptions = FileStorageOptions;

@Injectable()
export abstract class BaseRepository<T extends { id: number | string }> {
  protected readonly logger = new Logger(this.constructor.name);
  protected items: T[] = [];

  protected constructor(
    protected readonly fileStorage: FileStorageService,
    protected readonly writeQueue: WriteQueueService,
    protected readonly options: RepositoryOptions,
  ) {}

  async init(): Promise<void> {
    try {
      this.items = await this.fileStorage.readFile<T>(this.options);
      this.logger.log(`Loaded ${this.items.length} items from ${this.options.fileName}`);
    } catch (error) {
      this.logger.error("Failed to initialize repository", error);
      this.items = [];
    }
  }

  findAll(): T[] {
    return [...this.items];
  }

  findById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  async create(item: Omit<T, "id">): Promise<T> {
    const newItem = {
      ...item,
      id: this.generateNextId(),
    } as T;

    this.items.push(newItem);

    await this.persist();

    return newItem;
  }

  protected async persist(): Promise<void> {
    await this.writeQueue.enqueue({
      execute: async () => {
        await this.fileStorage.writeFile(this.options, this.items);
      },
    });
  }

  protected abstract generateNextId(): number | string;
}
