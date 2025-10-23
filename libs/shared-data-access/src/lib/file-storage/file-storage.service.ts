import { Injectable, Logger } from "@nestjs/common";
import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";

export type FileStorageOptions = {
  dataDir: string;
  fileName: string;
};

@Injectable()
export class FileStorageService {
  private readonly logger = new Logger(FileStorageService.name);

  async readFile<T>(options: FileStorageOptions): Promise<T[]> {
    try {
      const filePath = this.getFilePath(options);
      this.logger.log(`Reading file: ${filePath}`);

      const data = await readFile(filePath, "utf-8");
      const parsed = JSON.parse(data);

      if (!Array.isArray(parsed)) {
        this.logger.warn("Parsed data is not an array, returning empty array");
        return [];
      }

      return parsed as T[];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        this.logger.log("File not found, returning empty array");
        return [];
      }
      this.logger.error("Failed to read file", error);
      throw error;
    }
  }

  async writeFile<T>(options: FileStorageOptions, data: T[]): Promise<void> {
    try {
      const filePath = this.getFilePath(options);
      const directory = dirname(filePath);

      // Ensure directory exists
      await mkdir(directory, { recursive: true });

      const content = JSON.stringify(data, null, 2);
      await writeFile(filePath, content, "utf-8");

      this.logger.log(`Successfully wrote ${data.length} items to ${filePath}`);
    } catch (error) {
      this.logger.error("Failed to write file", error);
      throw error;
    }
  }

  private getFilePath(options: FileStorageOptions): string {
    return join(process.cwd(), options.dataDir, options.fileName);
  }
}
