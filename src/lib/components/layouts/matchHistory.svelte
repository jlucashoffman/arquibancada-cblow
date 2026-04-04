<script lang="ts">
    import { gameMaster } from "$lib/database/data.svelte";

    let viewMatch = $state("")

    const defineViewMatch = (id:string, anchor: string) => {
        if (viewMatch === id) {
            viewMatch = ""
            return
        }

        viewMatch = id

        setTimeout(() => {
            const element = document.getElementById(anchor)
            if (!element) return
            const top = window.scrollY + element.getBoundingClientRect().top - 128
            window.scrollTo({
                top,
                behavior: "smooth"
            })
        }, 300);
    }

    const handleCodinames = (c:string) => {
        switch (c) {
            case "MonkeyKing":
                return "Wukong"
                break;
        
            default:
                return c
                break;
        }
    }

</script>
<section id="match_history_section">
    <div class="content_wrapper">
        <h2>histórico de partidas</h2>
        {#each gameMaster.matchHistory as m}
            <div 
            class="match_group_wrapper"
            class:open={m.id === viewMatch}
            id={`match_${m.id}`}>
                <button
                    type="button"
                    class="match_group_banner panel_style"
                    class:winner_left={m.teams[0].points > m.teams[1].points}
                    class:winner_right={m.teams[1].points > m.teams[0].points}
                    onclick={() => {defineViewMatch(m.id, `match_${m.id}`)}}
                >
                    <p class="match_title">{m.title}</p>
                    <div class="teams_score">
                        <div class="team_side">
                            <p class="team_label">{m.teams[0].label}</p>
                            <p class="team_name">{m.teams[0].name}</p>
                        </div>
                        <div class="score_match">
                            <p class="team_score_points" class:winner={m.teams[0].points > m.teams[1].points}>{m.teams[0].points}</p>
                            <span class="material-symbols-outlined">close</span>
                            <p class="team_score_points" class:winner={m.teams[1].points > m.teams[0].points}>{m.teams[1].points}</p>
                        </div>
                        <div class="team_side">
                            <p class="team_label">{m.teams[1].label}</p>
                            <p class="team_name">{m.teams[1].name}</p>
                        </div>
                    </div>
                    <p class="match_type">{m.type}</p>
                    <p class="match_date">{m.date}</p>
                </button>
                
                <div class="match_group_rounds">
                {#each m.rounds as r}
                    <div class="match_round">
                        <div class="match_round_info_header">
                            <p>partida {r.round}</p>
                            <button class="card_selected panel_style">
                                <span class="material-symbols-outlined">playing_cards</span>
                                {r.card.name}
                            </button>
                        </div>
                        <div class="match_round_result panel_style">
                            {#each Object.values(r.teams) as [t]}
                                <div class="match_round_team_points">
                                    <p class="team_label">{t?.label}</p>
                                    <!-- <p class="team_points">
                                        <span class="team_points_kill">10</span>
                                        <span class="team_points_slash">/</span>
                                        <span class="team_points_death">5</span>
                                        <span class="team_points_slash">/</span>
                                        <span class="team_points_assist">1</span>
                                    </p> -->
                                    {#if r.winner === t?.id}
                                    <p class="team_round_winner">WIN</p>
                                    {:else}
                                    <p class="team_round_loser">LOSE</p>
                                    {/if}
                                </div>
                            {/each}
                        </div>
                        <div class="match_round_summoners panel_style">
                            {#each Object.values(r.teams) as [t]}
                            <ul class="match_round_team_summoners">
                            {#each t?.players as p}
                                <li>
                                    <div class="summoner_images">
                                        <img class="summoner_role" src={`assets/roles/${p?.role}.svg`} alt="">
                                        <img class="summoner_champ_pic" src={`https://ddragon.leagueoflegends.com/cdn/${m.patch}.1/img/champion/${p?.champion}.png`} alt="">
                                    </div>
                                    
                                    <div class="summoner_info">
                                        <p class="summoner_name">{p?.expand?.player?.name}</p>
                                        <p class="summoner_champion">{handleCodinames(p?.champion as string)}</p>
                                        {#if p?.expand.player.bot}
                                        <p class="player_is_bot">BOT</p>
                                        {/if}
                                    </div>
                                    <!-- <p class="summoner_kda">
                                        <span class="summoner_kda_kills">10</span>
                                        <span class="summoner_kda_slash">/</span>
                                        <span class="summoner_kda_death">5</span>
                                        <span class="summoner_kda_slash">/</span>
                                        <span class="summoner_kda_assist">1</span>
                                    </p> -->
                                </li>
                            {/each}
                            </ul>
                            {/each}
                        </div>
                    </div>    
                {/each}
                </div>
            </div>
        {/each}
    </div>
</section>

<style>
    #match_history_section {
    width: 100%;

        & .content_wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        max-width: 728px;
        margin: 0 auto;

        & .match_group_wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            width: 100%;

            &.open .match_group_rounds{
                max-height: 200vh;
            }

            & .match_group_banner {
                width: 100%;
                max-width: 512px;
                box-sizing: border-box;
                padding: 16px;
                border-radius: 16px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 16px;
                position: relative;
                overflow: hidden;
                cursor: pointer;

                & *::selection {
                    background-color: transparent;
                }

                &::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity .25s;
                }

                &.winner_left::before {
                    background: linear-gradient(135deg, color-mix(in oklab, var(--color-brand-main) 35%, transparent) 0%, transparent 58%);
                    opacity: 1;
                }

                &.winner_right::before {
                    background: linear-gradient(315deg, color-mix(in oklab, var(--color-brand-main) 35%, transparent) 0%, transparent 58%);
                    opacity: 1;
                }

                & .match_title, .match_type, .match_date {
                    text-transform: uppercase;
                    font-size: 12px;
                    opacity: .5;
                }

                & .teams_score {
                    display: flex;
                    width: 100%;

                    & .team_side {
                        display: flex;
                        align-items: center;
                        gap: 16px;
                        flex: 2;
                        position: relative;

                        & .team_label {
                            font-size: 2em;
                            font-weight: bold;

                            @media screen and (max-width: 350px) { 
                                font-size: 1.65em;
                            }
                        }

                        & .team_name {
                            opacity: 0.5;
                            font-size: 0.8em;
                            line-height: 1.2em;

                            @media screen and (max-width: 600px) { 
                                position: absolute;
                                bottom: -8px;
                            }

                            @media screen and (max-width: 350px) { 
                                display: none;
                            }
                        }

                        &:nth-child(3) {
                            flex-direction: row-reverse;

                            & p {
                                text-align: right;
                            }
                        }
                    }

                    & .score_match {
                        display: flex;
                        justify-content: center;
                        gap: 8px;
                        align-items: center;
                        flex: 1;

                        & .team_score_points {
                            font-variant-numeric: tabular-nums;
                            font-weight: bold;
                            font-size: 2.5rem;
                            position: relative;

                            &.winner::before {
                                content: '';
                                position: absolute;
                                width: 100%;
                                height: 100%;
                                padding: 8px;
                                top: 0;
                                left: 0;
                                transform: translate(-8px, -8px);
                                border-radius: 4px;
                                background: var(--color-block-stroke-default);
                                z-index: -1;
                            }
                        }
                    }
                }
            }

            & .match_group_rounds {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 16px;
                overflow: hidden;
                max-height: 0px;

                transition: .3s max-height;

                & .match_round {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;

                    & .match_round_info_header {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 8px;

                        & > p {
                            text-transform: uppercase;
                            font-size: 12px;
                            opacity: .5;
                        }

                        & button {
                            display: flex;
                            align-items: center;
                            gap: 4px;
                            padding: 4px 8px;
                            border-radius: 4px;

                            & span {
                                font-size: 16px;
                            }
                        }
                    }

                    & > div {
                        width: 100%;
                        box-sizing: border-box;
                        padding: 8px;
                        border-radius: 8px;
                    }

                    & .match_round_result {
                        display: flex;
                        align-items: center;
                        
                        & .match_round_team_points {
                            flex: 1;
                            display: flex;
                            gap: 8px;
                            align-items: center;

                            &:nth-child(2) {
                                flex-direction: row-reverse;
                            }

                            & .team_label {
                                font-size: 1.5rem;
                                font-weight: bold;
                            }

                            & .team_points {
                                display: flex;
                                align-items: center;
                                gap: 4px;
                                font-size: 0.85rem;
                                font-variant-numeric: tabular-nums;
                            }

                            & .team_round_winner {
                                box-sizing: border-box;
                                padding: 4px;
                                border-radius: 4px;
                                background: rgb(51, 155, 51);
                                font-size: 0.8rem;
                            }

                            & .team_round_loser {
                                box-sizing: border-box;
                                padding: 4px;
                                border-radius: 4px;
                                background: rgb(155, 51, 51);
                                font-size: 0.8rem;
                            }
                        }
                    }

                    & .match_round_summoners {
                        display: flex;
                        gap: 8px;

                        & .match_round_team_summoners {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            gap: 4px;

                            &:nth-child(2) li {
                                flex-direction: row-reverse;

                                & :is(.summoner_info, .summoner_images) {
                                flex-direction: row-reverse;
                                }

                                & .summoner_kda {
                                    margin-left: 0px;
                                    margin-right: auto;
                                }

                                & .summoner_info {
                                    text-align: right;
                                }
                            }

                            & li {
                                display: flex;
                                align-items: center;
                                gap: 16px;
                                box-sizing: border-box;
                                padding: 8px;
                                border-radius: 4px;
                                border: 1px solid var(--color-block-stroke-default);

                                & .summoner_images {
                                    display: flex;
                                    align-items: center;
                                    gap: 8px;

                                    & img {
                                        aspect-ratio: 1;
                                        border-radius: 50%;
                                        width: 24px;
                                    }

                                    & .summoner_role {
                                        @media screen and (max-width: 600px) {
                                            display: none;
                                        }
                                    }
                                }
                                
                                & .summoner_info {
                                    display: flex;
                                    align-items: center;
                                    gap: 8px;
                                    position: relative;
                                    font-size: 0.8rem;

                                    & .summoner_champion {
                                        opacity: .4;
                                        text-transform: uppercase;

                                        @media screen and (max-width: 600px) {
                                            display: none;
                                        }
                                    }

                                    & .summoner_champion {
                                        @media screen and (max-width: 600px) {
                                            font-size: 0.6em;
                                        }
                                    }

                                    & .player_is_bot {
                                        box-sizing: border-box;
                                        padding: 4px;
                                        border-radius: 4px;
                                        background: rgb(116, 116, 116);
                                        font-size: 0.8rem;
                                    }
                                }

                                & .summoner_kda {
                                    display: flex;
                                    margin-left: auto;
                                    margin-right: 0px;
                                    align-items: center;
                                    gap: 4px;
                                    font-size: 0.85rem;
                                    font-variant-numeric: tabular-nums;
                                }
                            }
                        }
                    }
                }
            }
        }
        }
    }
</style>