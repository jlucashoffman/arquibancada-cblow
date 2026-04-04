<script lang="ts">
    import { championshipData } from '$lib/runes.svelte';


type TypePrincipalCard = [name: string, pfp: string, url: string];
type TypePlayerCard = [role: string, name: string, url: string];
type TypeTeamMoment = "winner" | "active" | "defeated"

interface IPerson {
    name: string;
    pfp: string;
    livestream: string;
}

interface IHostRecord {
    expand?: {
        person?: IPerson;
    };
}

interface ITeamRecord {
    id: string,
    name: string,
    label: string,
    situation: "winner" | "active" | "defeated",
    expand: {
        president: IPerson
    }
}

interface IPlayerRecord {
    role: string,
    expand: {
        person: IPerson,
        team: {
            id: string
        }
    }
}

interface ITeam {
    id: string,
    name: string,
    label: string,
    situation: TypeTeamMoment,
    principal: TypePrincipalCard,
    players: TypePlayerCard[]
}

const hostRecords:IHostRecord[] = championshipData.hosts ? JSON.parse(championshipData.hosts) : [];
const teamsRecords:ITeamRecord[] = championshipData.teams ? JSON.parse(championshipData.teams) : [];
const playersRecords:IPlayerRecord[] = championshipData.players ? JSON.parse(championshipData.players) : [];

const hosts:TypePrincipalCard[] = hostRecords.map((host): TypePrincipalCard => {
    const person = host.expand?.person;

    return [person?.name ?? "", person?.pfp ?? "", person?.livestream ?? ""];
})

const teams:ITeam[] = teamsRecords.map((team): ITeam => {

    const president = team.expand.president

    return {
        id: team.id,
        name: team.name,
        label: team.label,
        situation: team.situation,
        principal: [president?.name ?? "", president?.pfp ?? "", president?.livestream ?? ""],
        players: playersRecords.filter((p) => {return p.expand.team.id == team.id}).map((p): TypePlayerCard => {
            return [p.role ?? "", p.expand.person.name ?? "", p.expand.person.livestream ?? ""];
        })
    }
})

let div_hosts:HTMLDivElement;
let div_teams:HTMLDivElement;

</script>

{#snippet principalCard([name, pfp, url]:TypePrincipalCard)}
    <a class="card_principal panel_style" href={url} target="_blank">
        <img src={`assets/pfps/${pfp}`} alt={`foto de perfil ${name}`}>
        <p>{name}</p>
    </a>
{/snippet}

{#snippet playerLabel([role, name, url]:TypePlayerCard)}
    <a class="player_label" href={url} target="_blank">
        <img src={`assets/roles/${role}.svg`} alt="">
        <p>{name}</p>
    </a>
{/snippet}

{#snippet teamCard(t:ITeam)}
    <div class="card_team panel_style">
        <h4>{t.name}</h4>
        {@render principalCard(t.principal)}
        <div>
            {#each t.players as p}
                {@render playerLabel(p)}
            {/each}
        </div>
    </div>
{/snippet}

<section id="participants_section">
    <div class="content_wrapper">
        <h2>participantes</h2>
        <div id="participants_box" class="panel_style">
            <h3>hosts</h3>
            <div bind:this={div_hosts} class="participants_cards">
                {#each hosts as h}
                    {@render principalCard(h)}
                {/each}
            </div>
            <h3>times</h3>
            <div bind:this={div_teams} class="participants_cards">
                {#each teams as t}
                    {@render teamCard(t)}
                {/each}
            </div>
        </div>
    </div>
</section>

<style>
#participants_section {
    display: block;
    width: 100%;

    & .content_wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        max-width: 1200px;
        margin: 0 auto;

        & #participants_box {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;

            box-sizing: border-box;
            padding: 16px;

            border-radius: 16px;

            width: 100%;

            & .participants_cards {
                display: grid;
                grid-template-columns: repeat(2, [col-start] 1fr);
                width: 100%;
                gap: 16px;

                @media screen and (max-width: 600px) {
                    grid-template-columns: repeat(1, [col-start] 1fr);
                }
            }
        }
    }
}

.card_principal {
    display: flex;
    gap: 16px;
    align-items: center;
    border-radius: 16px;
    box-sizing: border-box;
    padding: 16px;
    width: 100%;

    @media screen and (max-width: 964px) {
        padding: 8px 16px;
    }

    & img {
        display: inline-block;
        border-radius: 50%;
        width: 48px;

        @media screen and (max-width: 964px) {
            width: 32px;
        }
    }

    & p {
        text-transform: capitalize;
    }
}

.card_team {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    box-sizing: border-box;
    padding: 16px;
    border-radius: 16px;

    & > div {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;

        & > .player_label {
            display: flex;
            gap: 8px;
            align-items: center;

            box-sizing: border-box;
            padding: 4px;
            border-radius: 4px;

            transition: background-color .3s;

            &:hover {
                background-color: #ffffff16;
                background-color: oklch(1 0 0/0.08);
            }

            & img {
                width: 24px;
            }

            & p {
                font-size: 0.85rem;
            }
        }
    }
}
</style>