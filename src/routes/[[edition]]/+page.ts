export const prerender = true;

import { fetchAll, filter } from "$lib/fetchs";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { IEditionCollection, IHostsCollection, IPlayersCollection, ITeamsCollection, IChampionshipData } from "$lib/database/interfaces";

const blankChampionshipData:IChampionshipData = {
    editions: [],
    hosts: [],
    teams: [],
    players: []
}

export const load:PageLoad = 
    async({params, fetch}): 
    Promise<{ed: string, data:IChampionshipData}> => {
    const editions:IEditionCollection[] = await fetchAll(fetch, 'editions');
    const lastEdition = editions[0].name

    if (editions.length === 0) return {ed: lastEdition, data: blankChampionshipData}
    
    const requestedEdition = params.edition
    const existEdition = editions.filter((e) => e.name === requestedEdition)

    if (existEdition.length === 0) throw redirect(302, `${lastEdition}`);

    const [hosts, teams, players] = await Promise.all([
        fetchAll<IHostsCollection>(fetch, 'hosts', filter.hosts),
        fetchAll<ITeamsCollection>(fetch, 'teams', filter.teams),
        fetchAll<IPlayersCollection>(fetch, 'team_deal', filter.players)])

    const editionId:string = editions.filter((e) => e.name === requestedEdition || lastEdition)[0].id

    return {
        ed: editionId,
        data: {
            editions: editions,
            hosts: hosts,
            teams: teams,
            players: players
        }
    }
}