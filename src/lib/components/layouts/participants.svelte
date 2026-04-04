<script lang="ts">
    import { gameMaster } from '$lib/database/data.svelte';
    import type { HostPerson, IPlayersCollection, ITeamsCollection, PresidentPerson } from '$lib/database/interfaces';

    const roleOrder: Record<string, number> = {
        top: 0,
        jg: 1,
        mid: 2,
        adc: 3,
        bot: 4,
        sup: 5
    };

    const sortPlayersByRole = (players: IPlayersCollection[]) => {
        return [...players].sort((a, b) => {
            return (roleOrder[a.role] ?? Number.MAX_SAFE_INTEGER) - (roleOrder[b.role] ?? Number.MAX_SAFE_INTEGER);
        });
    };

</script>

{#snippet hostCard(host:HostPerson)}
    <a class="card_principal panel_style" href={host.livestream} target="_blank">
        <img src={`assets/pfps/${host.pfp}`} alt={`foto de perfil ${host.name}`}>
        <p>{host.name}</p>
    </a>
{/snippet}

{#snippet presidentCard(president:PresidentPerson)}
    <a class="card_principal panel_style" href={president.livestream} target="_blank">
        <img src={`assets/pfps/${president.pfp}`} alt={`foto de perfil ${president.name}`}>
        <p>{president.name}</p>
    </a>
{/snippet}

{#snippet playerLabel(player: Pick<IPlayersCollection, "role" | "expand">)}
    <a class="player_label" href={player.expand.person.livestream} target="_blank">
        <img src={`assets/roles/${player.role}.svg`} alt="">
        <p>{player.expand.person.name}</p>
    </a>
{/snippet}

{#snippet teamCard(t:ITeamsCollection)}
    <div class="card_team panel_style">
        <h4>{t.name}</h4>
        {@render presidentCard(t.expand.president)}
        <div>
            {#each sortPlayersByRole(gameMaster.data?.players.filter((p) => {return (p.team === t.id) && ["active", "transferred"].includes(p.situation)}) ?? []) as p}
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
            <div class="participants_cards hosts">
                {#each gameMaster.data?.hosts as h}
                {@render hostCard(h.expand.person)}
                {/each}
            </div>
            <h3>times</h3>
            <div class="participants_cards">
                {#each gameMaster.data?.teams as t}
                    {@render teamCard(t)}
                {/each}
            </div>
            <h3>Agradecimentos aos participantes excluídos</h3>
            <div id="exclude_members">
                {#each gameMaster.data?.players.filter((p) => p.situation === "kicked") as p}
                {@render playerLabel(p)}
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
                grid-template-columns: repeat(4, [col-start] 1fr);
                width: 100%;
                gap: 16px;

                &:is(.hosts) {
                    grid-template-columns: repeat(2, [col-start] 1fr);
                }

                @media screen and (max-width: 964px) {
                    grid-template-columns: repeat(2, [col-start] 1fr);
                    font-size: 0.9em;

                    & .card_team div {
                        gap: 2px;
                    }

                    & .player_label p {
                        font-size: 0.8em;
                    }
                }

                @media screen and (max-width: 600px) {
                    grid-template-columns: repeat(1, [col-start] 1fr);
                }
            }

            & #exclude_members {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                justify-content: center;

                opacity: .65;

                & .player_label {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    font-size: 0.75rem;
                    border: 1px solid var(--color-block-stroke-default);
                    background-color: #ffffff0d;
                    background-color: oklch(1 0 0/0.05);
                    box-sizing: border-box;
                    padding: 4px 8px;
                    border-radius: 8px;

                    &:hover {
                        background-color: #ffffff26;
                        background-color: oklch(1 0 0/0.15);
                    }

                    & img {
                        width: 24px;
                    }

                    & p {
                        text-overflow: ellipsis;
                    }
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