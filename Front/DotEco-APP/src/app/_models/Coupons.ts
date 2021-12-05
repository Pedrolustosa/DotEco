export interface Coupons {
    id: number;
    name: string;
    percent: string;
    description: string;
    userId: number;
    userFullName: string;
    companyId: number;
    companyFullName: string;
    status: Status;
}

export enum Status {
    Active = "Ativo",
    Inactive = "Inativo",
}