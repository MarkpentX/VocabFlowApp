export type GetUserStatsResp = {
    userWordsCount: number
    userTagsCount: number
}

type Tag = {
    title: string
    wordsCount: number
}

export type GetTagsResp = {
    tags: Tag[]
}