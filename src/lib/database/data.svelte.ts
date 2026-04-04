import type { IChampionshipData, ITeamsCollection } from "./interfaces";

class Championship {
    selectedEdition?:string = $state()
    allData?:IChampionshipData = $state()
    data?:IChampionshipData = $derived(
        {
            editions: this.allData?.editions.filter((e) => e.id === this.selectedEdition) || [],
            hosts: this.allData?.hosts.filter((e) => e.edition.includes(this.selectedEdition as string)) || [],
            teams: this.allData?.teams.filter((e) => e.edition.includes(this.selectedEdition as string)) || [],
            players: this.allData?.players.filter((e) => e.edition === this.selectedEdition) || [],
            cards: this.allData?.cards.filter((e) => e.edition === this.selectedEdition) || [],
            matches: this.allData?.matches.filter((e) => e.edition === this.selectedEdition) || [],
            summoners: this.allData?.summoners.filter((e) => e.expand.team.edition.includes(this.selectedEdition as string)) || []
        }
    )
    matchHistory = $derived(
        this.data?.matches
        .sort((a, b) => { return Date.parse(b.battle) - Date.parse(a.battle)})
        .map((m) => {
            return {
                id: m.id,
                title: m.title,
                type: m.type,
                patch: m.patch,
                date: new Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }).format(Date.parse(m.battle)),
                teams: m.teams.map((t) => {
                    const team = this.data?.teams.filter((team) => {return team.id === t})[0]
                    return {
                        label: team?.label,
                        name: team?.name,
                        points: m.expand.matches.filter((match) => {return match.winner === team?.id}).length
                    }
                }),
                rounds: m.expand.matches.map((match, i) => {
                    return {
                        match_id: match.id,
                        round: i + 1,
                        winner: match.winner,
                        card: {
                            id: match.card,
                            name: this.data?.cards.filter((c) => {return c.id === match.card})[0].name
                        },
                        teams: {
                            red: m.teams
                                .filter((t) => {return match.red_side === t})
                                .map((t) => {
                                const team = this.data?.teams.filter((team) => {return team.id === t})[0]
                                const summoners = this.data?.summoners.filter((sum) => { return sum.match === match.id && sum.expand.team.id === team?.id })
                                return {
                                    id: team?.id,
                                    label: team?.label,
                                    players: [
                                        summoners?.filter((s) => s.role === "top")[0],
                                        summoners?.filter((s) => s.role === "jg")[0],
                                        summoners?.filter((s) => s.role === "mid")[0],
                                        summoners?.filter((s) => s.role === "adc")[0],
                                        summoners?.filter((s) => s.role === "sup")[0]
                                    ]
                                }
                            }),
                            blue: m.teams
                                .filter((t) => {return match.blue_side === t})
                                .map((t) => {
                                const team = this.data?.teams.filter((team) => {return team.id === t})[0]
                                const summoners = this.data?.summoners.filter((sum) => { return sum.match === match.id && sum.expand.team.id === team?.id })
                                return {
                                    id: team?.id,
                                    label: team?.label,
                                    players: [
                                        summoners?.filter((s) => s.role === "top")[0],
                                        summoners?.filter((s) => s.role === "jg")[0],
                                        summoners?.filter((s) => s.role === "mid")[0],
                                        summoners?.filter((s) => s.role === "adc")[0],
                                        summoners?.filter((s) => s.role === "sup")[0]
                                    ]
                                }
                            })
                        }
                    }
                }).
                sort((a, b) => {return b.round - a.round})
            }
        })
    )
}

export const gameMaster = new Championship();