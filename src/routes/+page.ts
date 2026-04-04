import type { PageLoad } from "./$types";

interface IApiListResponse<T> {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    items: T[];
}

interface IRecordWithEdition {
    edition?: unknown;
}

const collectionBase = "https://api.arquibancada-cblow.com.br/api/collections";

const fetchAllRecords = async <T>(
    fetchFn: typeof fetch,
    collection: string,
    searchParams: Record<string, string> = {}
): Promise<T[]> => {
    const firstURL = new URL(`${collectionBase}/${collection}/records`);
    firstURL.searchParams.set("page", "1");
    firstURL.searchParams.set("perPage", "200");

    for (const [key, value] of Object.entries(searchParams)) {
        firstURL.searchParams.set(key, value);
    }

    const firstResponse = await fetchFn(firstURL);
    const firstData = await firstResponse.json() as IApiListResponse<T>;

    const allItems = [...firstData.items];

    for (let page = 2; page <= firstData.totalPages; page++) {
        const pageURL = new URL(`${collectionBase}/${collection}/records`);
        pageURL.searchParams.set("page", String(page));
        pageURL.searchParams.set("perPage", "200");

        for (const [key, value] of Object.entries(searchParams)) {
            pageURL.searchParams.set(key, value);
        }

        const pageResponse = await fetchFn(pageURL);
        const pageData = await pageResponse.json() as IApiListResponse<T>;
        allItems.push(...pageData.items);
    }

    return allItems;
};

const hasEdition = (value: unknown, editionId: string): boolean => {
    if (!value) return false;

    if (Array.isArray(value)) {
        return value.some((item) => hasEdition(item, editionId));
    }

    if (typeof value === "string") {
        return value.includes(editionId);
    }

    if (typeof value === "number") {
        return String(value) === editionId;
    }

    if (typeof value === "object") {
        const record = value as { id?: unknown };
        if (typeof record.id === "string") {
            return record.id === editionId;
        }
    }

    return false;
};

const byEdition = <T extends IRecordWithEdition>(items: T[], editionId: string): T[] => {
    return items.filter((item) => hasEdition(item.edition, editionId));
};

export const load: PageLoad = async ({ fetch }) => {
    const [editions, hosts, players, teams] = await Promise.all([
        fetchAllRecords<{ id: string; name: string; brackets: unknown }>(fetch, "editions"),
        fetchAllRecords<IRecordWithEdition>(fetch, "hosts", { expand: "person" }),
        fetchAllRecords<IRecordWithEdition>(fetch, "team_deal", {
            filter: "situation='active' || situation='transferred'",
            expand: "team,person,president"
        }),
        fetchAllRecords<IRecordWithEdition>(fetch, "teams", { expand: "president" })
    ]);

    const editionsWithData = editions.map((edition) => ({
        ...edition,
        prefetched: {
            hosts: byEdition(hosts, edition.id),
            players: byEdition(players, edition.id),
            teams: byEdition(teams, edition.id)
        }
    }));

	return {
		editions: editionsWithData
	};
};