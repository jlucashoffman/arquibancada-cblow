import type { IChampionshipData } from "./interfaces";

class Championship {
    selectedEdition?:string = $state()
    allData?:IChampionshipData = $state()
    data?:IChampionshipData = $derived(
        {
            editions: this.allData?.editions.filter((e) => e.id === this.selectedEdition) || [],
            hosts: this.allData?.hosts.filter((e) => e.edition.includes(this.selectedEdition as string)) || [],
            teams: this.allData?.teams.filter((e) => e.edition.includes(this.selectedEdition as string)) || [],
            players: this.allData?.players.filter((e) => e.edition === this.selectedEdition) || [],
            cards: this.allData?.cards.filter((e) => e.edition === this.selectedEdition) || []
        }
    )
}


export const gameMaster = new Championship();