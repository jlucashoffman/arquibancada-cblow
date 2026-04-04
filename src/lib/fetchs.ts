interface IPocketbasePayback<T> {
    page: number
    perPage: number
    totalItems: number
    totalPages: number
    items: T[]
}

const baseAPIURL = "https://api.arquibancada-cblow.com.br/api/collections";

export const fetchAll = async <T>
    (fetchFn: typeof fetch, collection: string, search?:object):
    Promise<T[]> => {
    const url = new URL(`${baseAPIURL}/${collection}/records`);
    url.searchParams.set("page", "1");
    url.searchParams.set("perPage", "100");

    if(search) {
    for(const [k,v] of Object.entries(search)) {
    url.searchParams.set(k,v); }}

    const response = await fetchFn(url);
    const json:IPocketbasePayback<T> = await response.json();
    const data = [...json.items]

    if(json.totalPages > 1) {
    for(let p = 2; p <= json.totalPages; p++) {
    const pURL = new URL(`${baseAPIURL}/${collection}/records`);
    pURL.searchParams.set("page", `${p}`);
    pURL.searchParams.set("perPage", "100");

    if(search) {
    for(const [k,v] of Object.entries(search)) {
    pURL.searchParams.set(k,v); }}

    const pResponse = await fetchFn(pURL);
    const pJSON:IPocketbasePayback<T> = await pResponse.json();

    data.push(...pJSON.items)}}

    return data
}

export const filter = {
    hosts: {
        expand: "person"
    },
    teams: {
        expand: "president"
    },
    players: {
        expand: "team,person,president"
    }
}