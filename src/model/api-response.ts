export interface ApiResponseOptions {
    next_page: number,
    perPage: number,
    previous_page: number | null,
    total: number,
    totalPages: number,
}

export const defaultApiResponseOptions: ApiResponseOptions = {
    next_page: 1,
    perPage: 10,
    previous_page: null,
    total: 0,
    totalPages: 0,
};

export interface ApiResponseData<T> extends ApiResponseOptions {
    data: T[];
}

export interface ApiResponse<T> {
    message: string;
    data: ApiResponseData<T>;
}
