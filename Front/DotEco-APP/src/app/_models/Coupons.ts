export interface Coupons {
    id: number;
    name: string;
    percent: string;
    description: string;
    status: Status;
    companyId: number;
    userId: number;
}

export enum Status {
    Active = "Active",
    Inactive = "Inactive",
}