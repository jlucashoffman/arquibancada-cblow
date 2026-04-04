<script lang="ts">
    import { championshipEdition } from "$lib/runes.svelte";
    import type { IBracketStage, IChampionshipBracket } from "$lib/runes.svelte";

    type BracketSide = IChampionshipBracket[keyof IChampionshipBracket];

    const bracketSides = $derived(
        championshipEdition.brackets ? Object.entries(championshipEdition.brackets) : []
    );

    const getColumns = (side: BracketSide): Array<[string, IBracketStage]> => {
        return Object.entries(side) as Array<[string, IBracketStage]>;
    };

    const teamName = (team: string | null) => team ?? "A definir";

    const isWinner = (team: string | null, winner: string | null) => {
        if (!team || !winner) return false;
        return team === winner;
    };
</script>

<section id="brackets_section">
    <div class="content_wrapper">
        <div id="brackets_block" class="panel_style">
            <h2>chaveamento</h2>
            {#if bracketSides.length === 0}
                <p>Sem chaveamento para esta edição.</p>
            {:else}
            <div id="bracket_content">
            {#each bracketSides as [side, bracketColumns]}
                <div class="bracket_side panel_style">
                    <h3>{side}</h3>
                    <div class="bracket_side_columns">
                    {#each getColumns(bracketColumns as BracketSide) as [columnKey, columnData]}
                        <div class="bracket_column panel_style">                     
                            <h4>{columnData.title}</h4>
                            <div class="bracket_column_battles">
                                {#each columnData.matches as m}
                                    <div class="bracket_battle">
                                        <div class="bracket_battle_day label_text">{m.day}</div>
                                        <div class="bracket_battle_team">
                                            <span class:winner={isWinner(m.team_a, m.winner)}>{teamName(m.team_a)}</span>
                                        </div>
                                        <div class="bracket_battle_team">
                                            <span class:winner={isWinner(m.team_b, m.winner)}>{teamName(m.team_b)}</span>
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/each}
                    </div>
                </div>
            {/each}
            </div>
            
            {/if}
        </div>
    </div>
</section>

<style>
    #brackets_section {
    width: 100%;

        & .content_wrapper {
        display: flex;
        justify-content: center;
        width: 100%;

            & #brackets_block {
            box-sizing: border-box;
            padding: 16px;
            border-radius: 16px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 32px;
            overflow-x: auto;

            & #bracket_content {
                width: 100%;
                overflow-x: auto;
                display: flex;
                flex-direction: column;
                gap: 16px;

                & .bracket_side {
                min-width: 100%;
                width: fit-content;
                box-sizing: border-box;
                padding: 16px;
                border-radius: 16px;
                display: flex;
                flex-direction: column;
                gap: 16px;
                position: relative;
                
                    & .bracket_side_columns {
                    display: flex;
                    gap: 16px;

                        & .bracket_column {
                            min-width: 256px;
                            flex: 1 0 auto;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            gap: 8px;
                            box-sizing: border-box;
                            padding: 8px;
                            border-radius: 8px;

                            & .bracket_column_battles {
                                width: 100%;
                                display: flex;
                                flex-direction: column;
                                gap: 8px;

                                & .bracket_battle {
                                    display: flex;
                                    flex-direction: column;
                                    gap: 4px;
                                    width: 100%;
                                    box-sizing: border-box;
                                    padding: 8px;
                                    border-radius: 8px;
                                    border: 1px solid var(--color-block-stroke-default);
                                    background-color: #ffffff0d;
                                    background-color: oklch(1 0 0/0.05);

                                    & .bracket_battle_day {
                                        opacity: .8;
                                    }

                                    & .bracket_battle_team {
                                        display: flex;
                                        align-items: center;

                                        & span {
                                            display: block;
                                            width: 100%;
                                            border-radius: 6px;
                                            box-sizing: border-box;
                                            padding: 6px 8px;
                                            background-color: #ffffff0d;
                                            background-color: oklch(1 0 0/0.05);
                                            border: 1px solid transparent;
                                            overflow: hidden;
                                            text-overflow: ellipsis;
                                            white-space: nowrap;
                                        }

                                        & .winner {
                                            border-color: var(--color-brand-stroke);
                                            box-shadow: inset 0 0 0 1px var(--color-brand-shadow-effect-main);
                                            font-weight: bold;
                                        }
                                    }
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