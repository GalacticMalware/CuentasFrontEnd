export interface HttpResponse <T> {
    success: string | boolean,
    data?: T | null,
    message: string
}