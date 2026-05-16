export interface Link {
    rel: string
    href: string
}

export interface QuoteModel {
    id: string
    text: string
    author: string
    likes: number
    createdAt: string
    modifiedAt: string
    links: Link[]
}

export interface QuoteRequestModel {
    text: string
    author: string
}