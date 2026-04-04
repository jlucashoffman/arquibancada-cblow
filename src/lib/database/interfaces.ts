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

export interface IChampionshipData {
    editions: IEditionCollection[],
    hosts: IHostsCollection[],
    teams: ITeamsCollection[],
    players: IPlayersCollection[]
}