export interface DbRepository {
  executeQuery(query: string, placeholders?: any[]): Promise<any>;
}
