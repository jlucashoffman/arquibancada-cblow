class NavbarController {
    isOpen = $state(false);

    trigger = () => { this.isOpen = !this.isOpen; };
}

class LivestreamController {
    inLive = $state(false);
    private loopId: number | undefined = undefined;

    async checkYoda() {
        const response = await fetch('https://kick.com/api/v2/channels/yoda');
        const data = await response.json();

        this.inLive = data.livestream !== null || false;
    }

    loopObserver() {
        this.loopId = setInterval(() => {
            this.checkYoda();
        }, 5000)
    }

    clearLoop() {
        if(this.loopId) {
            clearInterval(this.loopId)
            this.loopId = undefined
        }
    }
}

export type BracketTeamName = string | null;

export interface IBracketMatch {
    day: string;
    team_a: BracketTeamName;
    team_b: BracketTeamName;
    winner: BracketTeamName;
}

export interface IBracketStage {
    title: string;
    matches: IBracketMatch[];
}

export interface IUpperBracket {
    quarter: IBracketStage;
    semis: IBracketStage;
    upper_final: IBracketStage;
    gran_final: IBracketStage;
}

export interface ILowerBracket {
    elimination: IBracketStage;
    retry: IBracketStage;
    second_retry: IBracketStage;
    lower_final: IBracketStage;
}

export interface IChampionshipBracket {
    upper: IUpperBracket;
    lower: ILowerBracket;
}

export interface IEditionPrefetchedData {
    hosts: unknown[];
    players: unknown[];
    teams: unknown[];
}

const normalizeBracket = (raw: unknown): IChampionshipBracket | null => {
    if (!raw) return null;

    // PocketBase can return JSON fields as object or string depending on schema/setup.
    if (typeof raw === "object") {
        return raw as IChampionshipBracket;
    }

    if (typeof raw === "string") {
        try {
            const parsed = JSON.parse(raw) as unknown;

            if (typeof parsed === "string") {
                return JSON.parse(parsed) as IChampionshipBracket;
            }

            if (parsed && typeof parsed === "object") {
                return parsed as IChampionshipBracket;
            }
        } catch {
            return null;
        }
    }

    return null;
}

class EditionController {
    edition:string = $state("")
    editionId:string = $state("")
    brackets:IChampionshipBracket | null = $state(null)

    define = (name: string, id:string, b:unknown, prefetched?: IEditionPrefetchedData) => {
        this.edition = name
        this.editionId = id
        this.brackets = normalizeBracket(b)

        championshipData.hosts = JSON.stringify(prefetched?.hosts ?? [])
        championshipData.players = JSON.stringify(prefetched?.players ?? [])
        championshipData.teams = JSON.stringify(prefetched?.teams ?? [])

        progressManager.hostsLoaded = true
        progressManager.playersLoaded = true
        progressManager.teamsLoaded = true
    }
}

class ChampionshipData {
    hosts = $state("")
    players = $state("")
    teams = $state("")
}

class ProgressController {
    editionLoaded = $state(false);
    hostsLoaded = $state(false);
    playersLoaded = $state(false);
    teamsLoaded = $state(false);

    dataLoaded = $derived(
        this.hostsLoaded && 
        this.playersLoaded && 
        this.teamsLoaded)
}

export const navManager = new NavbarController();
export const livestreamObserver = new LivestreamController();
export const championshipEdition = new EditionController();
export const championshipData = new ChampionshipData();
export const progressManager = new ProgressController();