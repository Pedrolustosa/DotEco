export interface Coupons {
    id: number,
    name: string,
    quantity: number,
    percent: string,
    status: Status,
    userId: number;
}

export enum Status {
    Active = 0,
    Inactive = 1,
}