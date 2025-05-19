export interface IHistoricService {
    get(userId: string): Promise<any>;
}
    