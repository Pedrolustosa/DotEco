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
    Scheduled = "Scheduled",
    Confirmed = "Confirmed",
    Refused = "Refused",
}

export enum StatusAssociation {
    Scheduled = "Scheduled",
    Confirmed = "Confirmed",
    Refused = "Refused",
}