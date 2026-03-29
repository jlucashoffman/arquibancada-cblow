<script lang="ts">

type TypePrincipalCard = [name: string, pfp: string, url: string];
type TypePlayerCard = [role: string, name: string, url: string];
type TypeTeamMoment = "winner" | "active" | "defeated"

interface ITeam {
    name: string,
    label: string,
    situation: TypeTeamMoment,
    principal: TypePrincipalCard,
    players: TypePlayerCard[]
}

const hosts:TypePrincipalCard[] = [
    ["yoda", "yoda.webp", ""],
    ["bronziocre", "bronziocre.webp", ""]
]

const teams:ITeam[] = [
    {
        name: "lowchonete",
        label: "lct",
        situation: "active",
        principal: ["arthur lanches", "artur.webp", ""],
        players: [
            ["top", "osurt", ""],
            ["jg", "veio whatsapp", ""],
            ["mid", "azirdewarmog", ""],
            ["adc", "criz", ""],
            ["sup", "micael pastel", ""]
        ]
    },
    {
        name: "bronzinthians",
        label: "",
        situation: "active",
        principal: ["luma", "luma.webp", ""],
        players: [
            ["top", "bpm zecapagod", ""],
            ["jg", "pdj shaco faccao", ""],
            ["mid", "frenezeri", ""],
            ["adc", "nkz", ""],
            ["sup", "theuz", ""]
        ]
    },
    {
        name: "skt teleton",
        label: "skt",
        situation: "active",
        principal: ["rodil", "rodil.webp", ""],
        players: [
            ["top", "kissidane", ""],
            ["jg", "pdj shaco faccao", ""],
            ["mid", "frenezeri", ""],
            ["adc", "megaextro", ""],
            ["sup", "pombo", ""]
        ]
    },
    {
        name: "oreiudos junior",
        label: "",
        situation: "active",
        principal: ["brucer", "brucer.webp", ""],
        players: [
            ["top", "chenderboy", ""],
            ["jg", "vks bmag", ""],
            ["mid", "danverll", ""],
            ["adc", "loose", ""],
            ["sup", "eu me caguei", ""]
        ]
    },
    {
        name: "sktenis academy",
        label: "",
        situation: "active",
        principal: ["yetz", "yetz.webp", ""],
        players: [
            ["top", "mielcohen", ""],
            ["jg", "zangrando", ""],
            ["mid", "o bobo", ""],
            ["adc", "thaaylady", ""],
            ["sup", "sojogomutado", ""]
        ]
    },
    {
        name: "t1lápias",
        label: "",
        situation: "active",
        principal: ["kennzy", "kenzy.webp", ""],
        players: [
            ["top", "carecalhadora", ""],
            ["jg", "vô corvo1", ""],
            ["mid", "ruim e esquisito", ""],
            ["adc", "elgato", ""],
            ["sup", "oxee", ""]
        ]
    },
    {
        name: "shoppingfu tatuapelion",
        label: "",
        situation: "active",
        principal: ["revolta", "rebola.webp", ""],
        players: [
            ["top", "cap farinha", ""],
            ["jg", "zerochannn", ""],
            ["mid", "kirah", ""],
            ["adc", "rluperin1", ""],
            ["sup", "mandszinha", ""]
        ]
    },
    {
        name: "vos bronze",
        label: "",
        situation: "active",
        principal: ["absolut", "absolut.webp", ""],
        players: [
            ["top", "jeiel up", ""],
            ["jg", "castro yse", ""],
            ["mid", "galorural", ""],
            ["adc", "lipeeh", ""],
            ["sup", "é o puxas", ""]
        ]
    }
]

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

    & img {
        display: inline-block;
        border-radius: 50%;
        width: 48px;
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