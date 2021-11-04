export interface CollectionData {
    id: number;
    address: string;
    cep: string;
    reference: string;
    email: string;
    telephone: string;
    associationId: number;
    statusClient: StatusClient;
    statusAssociation: StatusAssociation;
}

export enum StatusClient {
    Agendado = 0,
    Confirmado = 1,
    Recusado = 2,
}

export enum StatusAssociation {
    Agendado = 0,
    Confirmado = 1,
    Recusado = 2,
}