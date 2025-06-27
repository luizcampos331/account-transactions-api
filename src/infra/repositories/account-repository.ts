import fs from 'fs/promises';
import path from 'path';
import { IAccountDTO } from '@/entities/i-account-dto';

export interface IAccountRepository {
  findById(id: string): Promise<IAccountDTO | null>;
  create(data: IAccountDTO): Promise<void>;
  update(data: IAccountDTO): Promise<void>;
}

export class JsonAccountRepository implements IAccountRepository {
  private readonly databasePath = path.join(process.cwd(), 'database');
  private readonly filePath = path.join(this.databasePath, 'accounts.json');

  private async ensureDatabaseExists(): Promise<void> {
    try {
      await fs.access(this.databasePath);
    } catch {
      await fs.mkdir(this.databasePath, { recursive: true });
    }

    try {
      await fs.access(this.filePath);
    } catch {
      const defaultData: IAccountDTO[] = [];
      await fs.writeFile(
        this.filePath,
        JSON.stringify(defaultData, null, 2),
        'utf-8',
      );
    }
  }

  private async readData(): Promise<IAccountDTO[]> {
    await this.ensureDatabaseExists();

    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  public async findById(id: string): Promise<IAccountDTO | null> {
    const accounts = await this.readData();
    return accounts.find(account => account.id === id) || null;
  }

  public async create(data: IAccountDTO): Promise<void> {
    const accounts = await this.readData();
    accounts.push(data);

    await fs.writeFile(
      this.filePath,
      JSON.stringify(accounts, null, 2),
      'utf-8',
    );
  }

  public async update(data: IAccountDTO): Promise<void> {
    const accounts = await this.readData();
    const index = accounts.findIndex(account => account.id === data.id);
    accounts[index] = data;

    await fs.writeFile(
      this.filePath,
      JSON.stringify(accounts, null, 2),
      'utf-8',
    );
  }
}
