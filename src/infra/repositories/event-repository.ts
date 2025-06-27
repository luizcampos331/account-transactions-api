import { IEventDTO } from '@/entities/i-event-dto';
import fs from 'fs/promises';
import path from 'path';

export interface IEventRepository {
  create(data: IEventDTO): Promise<void>;
  reset(): Promise<void>;
}

export class JsonEventRepository implements IEventRepository {
  private readonly databasePath = path.join(process.cwd(), 'database');
  private readonly filePath = path.join(this.databasePath, 'events.json');

  private async ensureDatabaseExists(): Promise<void> {
    try {
      await fs.access(this.databasePath);
    } catch {
      await fs.mkdir(this.databasePath, { recursive: true });
    }

    try {
      await fs.access(this.filePath);
    } catch {
      const defaultData: IEventDTO[] = [];
      await fs.writeFile(
        this.filePath,
        JSON.stringify(defaultData, null, 2),
        'utf-8',
      );
    }
  }

  private async readData(): Promise<IEventDTO[]> {
    await this.ensureDatabaseExists();

    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  public async create(data: IEventDTO): Promise<void> {
    const events = await this.readData();
    events.push(data);

    await fs.writeFile(this.filePath, JSON.stringify(events, null, 2), 'utf-8');
  }

  public async reset(): Promise<void> {
    await this.ensureDatabaseExists();
    await fs.writeFile(this.filePath, JSON.stringify([], null, 2), 'utf-8');
  }
}
