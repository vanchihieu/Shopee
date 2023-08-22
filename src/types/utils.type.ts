export interface SuccessResponse<Data> {
    message: string;
    data: Data;
}
export interface ErrorResponse<Data> {
    message: string;
    data?: Data;
}

// cu phap '-? se loai bo undefined cua key optional
export type NoUndefinedField<T> = {
    [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};
