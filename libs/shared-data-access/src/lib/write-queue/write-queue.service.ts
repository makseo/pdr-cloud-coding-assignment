import { Injectable, Logger } from "@nestjs/common";
import { from } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

export interface WriteOperation<T = unknown> {
  execute: () => Promise<T>;
}

@Injectable()
export class WriteQueueService {
  private readonly logger = new Logger(WriteQueueService.name);
  private readonly queue: WriteOperation<unknown>[] = [];
  private isProcessing = false;

  async enqueue<T>(operation: WriteOperation<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const wrappedOperation: WriteOperation<unknown> = {
        execute: async () => {
          try {
            const result = await operation.execute();
            resolve(result as T);
            return result;
          } catch (error) {
            reject(error);
            throw error;
          }
        },
      };

      this.queue.push(wrappedOperation);
      this.processQueue();
    });
  }

  private processQueue(): void {
    if (this.isProcessing || this.queue.length === 0) {
      return;
    }

    this.isProcessing = true;

    // Create an observable that processes all queue items sequentially
    from(this.queue)
      .pipe(
        concatMap((operation) =>
          from(operation.execute()).pipe(
            tap(() => {
              // Remove the completed operation from the queue
              this.queue.shift();
            }),
          ),
        ),
        finalize(() => {
          this.isProcessing = false;
          this.logger.debug("Queue processing completed");
        }),
      )
      .subscribe({
        error: (error) => {
          this.logger.error("Queue processing error", error);
          this.isProcessing = false;
        },
      });
  }
}
