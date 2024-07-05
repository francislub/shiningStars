export interface News {
    _id: string;
    title: string;
    category: string;
    description: string;
    photo: string;
    date: string;
    tags: string[];
    creator: string;
    summary: string;
}

export interface Event {
    _id: string;
    activity: string;
    description: string;
    date: string;
    place: string;
    photo: string;
    creator: string;
    tags: string[];
    status: string;
}
