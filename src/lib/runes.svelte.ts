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

class EditionController {
    edition:string = $state("")
    editionId:string = $state("")

    ulrs= {
        hosts: "https://api.arquibancada-cblow.com.br/api/collections/hosts/records",
        players: "https://api.arquibancada-cblow.com.br/api/collections/team_deal/records",
        teams: "https://api.arquibancada-cblow.com.br/api/collections/teams/records"
    }

    updateData = async () => {
        const searchHostsURL = new URL(this.ulrs.hosts)
        searchHostsURL.searchParams.set('filter', `edition~'${this.editionId}'`)
        searchHostsURL.searchParams.set('expand', 'person')

        const searchPlayersURL = new URL(this.ulrs.players)
        searchPlayersURL.searchParams.set('filter', `edition~'${this.editionId}' && (situation='active' || situation='transferred')`)
        searchPlayersURL.searchParams.set('expand', 'team,person,president')
        searchPlayersURL.searchParams.set('perPage', '40')

        const searchTeamsURL = new URL(this.ulrs.teams)
        searchTeamsURL.searchParams.set('filter', `edition~'${this.editionId}'`)
        searchTeamsURL.searchParams.set('expand', 'president')

        const [hostResponse, playersResponse, teamsResponse] = await Promise.all([
            fetch(searchHostsURL),
            fetch(searchPlayersURL),
            fetch(searchTeamsURL)
        ]);

        const hostJSON = await hostResponse.json();
        championshipData.hosts = JSON.stringify(hostJSON.items) || "";

        const playersJSON = await playersResponse.json();
        championshipData.players = JSON.stringify(playersJSON.items) || "";

        const teamsJSON = await teamsResponse.json();
        championshipData.teams = JSON.stringify(teamsJSON.items) || "";

        if (championshipData.hosts != "") progressManager.hostsLoaded = true
        if (championshipData.players != "") progressManager.playersLoaded = true
        if (championshipData.teams != "") progressManager.teamsLoaded = true
    }

    define = (name: string, id:string) => {
        this.edition = name
        this.editionId = id
        this.updateData()
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