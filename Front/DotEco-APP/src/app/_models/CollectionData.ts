import { Association } from "./Association";

export interface CollectionData {
    id: number;
    address: string;
    cep: string;
    reference: string;
    email: string;
    telephone: string;
    associationId: Association[];
    userId: number;
    statusClient: StatusClient;
    statusAssociation: StatusAssociation;
}

export enum StatusClient {
    Waiting = "Waiting",
    Scheduled = "Scheduled",
    Confirmed = "Confirmed",
    Refused = "Refused",
}

export enum StatusAssociation {
    Waiting = "Waiting",
    Scheduled = "Scheduled",
    Confirmed = "Confirmed",
    Refused = "Refused",
}