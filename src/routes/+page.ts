import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
    const [editionsResponse] = await Promise.all([
        fetch('https://api.arquibancada-cblow.com.br/api/collections/editions/records')
    ]);

    const editionsData = await editionsResponse.json();

	return {
        editions: editionsData.items
	};
};