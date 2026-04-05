export const prerender = true;
export const trailingSlash = 'always';

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
    let editions: IEditionCollection[] = [];

    try {
        editions = await fetchAll(fetch, 'editions');
    } catch (error) {
        console.error('Failed to fetch editions during load:', error);
        return { ed: '', data: blankChampionshipData };
    }

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

    let hosts: IHostsCollection[] = [];
    let teams: ITeamsCollection[] = [];
    let players: IPlayersCollection[] = [];
    let cards: ICardCollection[] = [];
    let matches: IMatchCollection[] = [];
    let summoners: ISummonerCollection[] = [];

    try {
        [hosts, teams, players, cards, matches, summoners] = await Promise.all([
            fetchAll<IHostsCollection>(fetch, 'hosts', filter.hosts),
            fetchAll<ITeamsCollection>(fetch, 'teams', filter.teams),
            fetchAll<IPlayersCollection>(fetch, 'team_deal', filter.players),
            fetchAll<ICardCollection>(fetch, 'cards', filter.cards),
            fetchAll<IMatchCollection>(fetch, 'match_group', filter.matches),
            fetchAll<ISummonerCollection>(fetch, 'match_composition', filter.summoners)
        ]);
    } catch (error) {
        console.error('Failed to fetch edition data during load:', error);
    }

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