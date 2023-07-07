export type Dog = {
    id: number;
    bred_for: string;
    breed_group: string;
    height: {
        imperial: string;
        metric: string;
    },
    image: {
        url: string;
    },
    life_span: string;
    name: string;
    origin: string;
    temperament: string;
    weight: {
        imperial: string;
        metric: string;
    },
    description?: string;
}