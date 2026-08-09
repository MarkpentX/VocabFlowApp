export interface Tag {
    id: string;
    name: string;
    userId: string | null;
}

export interface TagWithWordsCount {
    id: string;
    title: string;
    wordsCount: number;
}
