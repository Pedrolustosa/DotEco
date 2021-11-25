export interface Coupons {
    id: number;
    name: string;
    percent: string;
    status: Status;
    companyId: number;
    userId: number;
}

export enum Status {
    Active = "Active",
    Inactive = "Inactive",
}