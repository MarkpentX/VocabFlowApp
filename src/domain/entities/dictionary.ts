export interface Dictionary {
    id: string;
    name: string;
    userId: string | null;
}

export interface DictionaryWithWordsCount {
    id: string;
    title: string;
    wordsCount: number;
}
