class NavbarController {
    isOpen = $state(false);

    trigger = () => { this.isOpen = !this.isOpen; };
}

class LivestreamController {
    inLive = $state(false);
    private loopId: number | undefined = undefined;
    private readonly retryWindowsMs = [5000, 60000, 1800000, 7200000];
    private readonly attemptsPerWindow = 10;
    private currentWindowIndex = 0;
    private attemptsInCurrentWindow = 0;

    async checkYoda() {
        try {
            const response = await fetch('https://kick.com/api/v2/channels/yoda');
            const data = await response.json();

            this.inLive = data.livestream !== null || false;
        } catch {
            this.inLive = false;
        }

        return this.inLive;
    }

    private resetRetryWindow() {
        this.currentWindowIndex = 0;
        this.attemptsInCurrentWindow = 0;
    }

    private bumpRetryWindow() {
        this.attemptsInCurrentWindow += 1;

        if (this.attemptsInCurrentWindow < this.attemptsPerWindow) return;

        this.attemptsInCurrentWindow = 0;

        if (this.currentWindowIndex < this.retryWindowsMs.length - 1) {
            this.currentWindowIndex += 1;
        }
    }

    private nextDelayMs() {
        return this.retryWindowsMs[this.currentWindowIndex];
    }

    private scheduleNextTick(delay: number) {
        this.clearLoop();
        this.loopId = window.setTimeout(() => {
            this.loopObserver();
        }, delay);
    }

    async loopObserver() {
        const isLive = await this.checkYoda();

        if (isLive) {
            this.resetRetryWindow();
        } else {
            this.bumpRetryWindow();
        }

        this.scheduleNextTick(this.nextDelayMs());
    }

    clearLoop() {
        if(this.loopId !== undefined) {
            clearTimeout(this.loopId)
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