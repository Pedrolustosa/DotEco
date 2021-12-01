import { Association } from "./Association";

export interface CollectionData {
    id: number;
    name: string;
    address: string;
    cep: string;
    reference: string;
    email: string;
    telephone: string;
    userId: number;
    associationId: Association[];
    statusPoint: StatusPoint;
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

export enum StatusPoint {
    Rescued = "c",
    NotRescued = "NotRescued",
}