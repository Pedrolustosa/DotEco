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
    Waiting = "Aguardando",
    Scheduled = "Agendado",
    Confirmed = "Confirmado",
    Refused = "Recusado",
}

export enum StatusAssociation {
    Waiting = "Aguardando",
    Scheduled = "Agendado",
    Confirmed = "Confirmado",
    Refused = "Recusado",
}

export enum StatusPoint {
    NotRescued = "NaoResgatado",
    Rescued = "Resgatado",
}