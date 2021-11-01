export interface CollectionData {
    id: number;
    address: string;
    cep: string;
    reference: string;
    email: string;
    telephone: string;
    associationId: number;
    status: Status;
}

export enum Status {
    Agendado = 0,
    Confirmado = 1,
    Recusado = 2,
}