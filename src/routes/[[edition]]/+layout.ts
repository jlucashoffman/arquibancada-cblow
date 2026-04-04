export const prerender = true;

import { fetchAll, filter } from "$lib/fetchs";
import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";
import type { IEditionCollection, IHostsCollection, IPlayersCollection, ITeamsCollection, IChampionshipData, ICardCollection, IMatchCollection, ISummonerCollection } from "$lib/database/interfaces";

const blankChampionshipData:IChampionshipData = {
    editions: [],
    hosts: [],
    teams: [],
    players: [],
    cards: [],
    matches: [],
    summoners: []
}

export const load:LayoutLoad = 
    async({params, fetch, url}): 
    Promise<{ed: string, data:IChampionshipData}> => {
    const editions:IEditionCollection[] = await fetchAll(fetch, 'editions');
    if (editions.length === 0) return {ed: "", data: blankChampionshipData}

    const lastEdition = editions[0].name
    
    const requestedEdition = params.edition

    if (!requestedEdition) {
        const suffix = url.pathname === "/" ? "" : url.pathname
        throw redirect(302, `/${lastEdition}${suffix}`)
    }

    const existEdition = editions.filter((e) => e.name === requestedEdition)

    if (existEdition.length === 0) {
        const suffix = url.pathname.replace(/^\/[^/]+/, "")
        throw redirect(302, `/${lastEdition}${suffix}`)
    }

    const [hosts, teams, players, cards, matches, summoners] = await Promise.all([
        fetchAll<IHostsCollection>(fetch, 'hosts', filter.hosts),
        fetchAll<ITeamsCollection>(fetch, 'teams', filter.teams),
        fetchAll<IPlayersCollection>(fetch, 'team_deal', filter.players),
        fetchAll<ICardCollection>(fetch, 'cards', filter.cards),
        fetchAll<IMatchCollection>(fetch, 'match_history', filter.matches),
        fetchAll<ISummonerCollection>(fetch, 'match_composition', filter.summoners)],
        )

    const editionId:string = existEdition[0].id


    return {
        ed: editionId,
        data: {
            editions: editions,
            hosts: hosts,
            teams: teams,
            players: players,
            cards: cards,
            matches: matches,
            summoners: summoners
        }
    }
}