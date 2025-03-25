export type User = {
    id: number,
    first_name: string,
    last_name: string | null,
    gender: 'male' | 'female' | 'other',
    interest: 'men' | 'women' | 'other',
    created_at: string
    greeting?: string
}
