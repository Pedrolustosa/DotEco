import { Association } from "./Association";

export interface CollectionData {
    id: number;
    address: string;
    cep: string;
    reference: string;
    email: string;
    telephone: string;
    association: Association[];
}