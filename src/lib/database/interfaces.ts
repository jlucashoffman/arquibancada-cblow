interface IPersonCollection {
    name: string
    pfp: string
    livestream: string
    puuid: string
    bot: boolean
}

export type HostPerson = Pick<IPersonCollection, "name" | "pfp" | "livestream">
export type PresidentPerson = Pick<IPersonCollection, "name" | "pfp" | "livestream" | "puuid">
type TeamSituation = "winner" | "active" | "defeated"
type PlayerPerson = Pick<IPersonCollection, "name" | "pfp" | "livestream" | "puuid">
type PlayerRole = "top" | "jg" | "mid" | "adc" | "sup"
type PlayerSituation = "active" | "transferred" | "kicked"
type MatchType = "MD1" | "MD3" | "MD5"

export interface IEditionCollection {
    id: string
    name: string
    edition: string
    brackets: Object
}

export interface IHostsCollection {
    edition: string[]
    expand: {
        person: HostPerson
    }
}

export interface ITeamsCollection {
    edition: string
    id: string
    name: string
    label: string
    situation: TeamSituation
    expand: {
        president: PresidentPerson
    }
}

export interface IPlayersCollection {
    edition: string
    team: string
    role: PlayerRole
    situation: PlayerSituation
    expand: {
        person: PlayerPerson
    }
}

export interface ICardCollection {
    edition: string
    id: string
    version: number
    name: string
    description: string
    image: string
    active: boolean
}

export interface IMatchCollection {
    id: string
    teams: string[]
    type: MatchType
    battle:string
    edition: string
    expand: {
        matches: {
            id: string
            winner: string
            blue_side: string
            red_side: string
            card: string
        }
    }
}

export interface ISummonerCollection {
    id: string
    match: string
    player: string
    champion: string
    role: PlayerRole
    spell_01: string
    spell_02: string
    expand: {
        team: Pick<ITeamsCollection, "edition" | "name" | "id">
    }
}

export interface IChampionshipData {
    editions: IEditionCollection[]
    hosts: IHostsCollection[]
    teams: ITeamsCollection[]
    players: IPlayersCollection[]
    cards: ICardCollection[],
    matches: IMatchCollection[],
    summoners: ISummonerCollection[]
}