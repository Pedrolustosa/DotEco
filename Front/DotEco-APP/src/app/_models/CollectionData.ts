export interface CollectionData {
    id: number;
    address: string;
    cep: string;
    reference: string;
    email: string;
    telephone: string;
    associationId: number;
    userId: number;
    statusClient: StatusClient;
    statusAssociation: StatusAssociation;
}

export enum StatusClient {
    Scheduled = 0,
    Confirmed = 1,
    Refused = 2,
}

export enum StatusAssociation {
    Scheduled = 0,
    Confirmed = 1,
    Refused = 2,
}