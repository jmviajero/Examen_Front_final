

export type User = {
    name: string,
    email: string,
    password: string,
    id: string,
    favs: []
}

export type Video = {
    title: string,
    thumbnail: string
    description: string
    duration: number,
    youtubeid: string,
    date: string,
    id: string,
    fav: boolean
}