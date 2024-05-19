import {defineEventHandler, getQuery} from "h3";

export default defineEventHandler(async (event) => {
    const steamID: number = <number>getQuery(event).steamID;
    const config = useRuntimeConfig();

    if (!steamID) {
        return {error: "Invalid steamID"};
    }

    try {
        const res: any = await $fetch(
            `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/`,
            {
                params: {
                    key: config.steamApiKey,
                    steamid: steamID,
                },
            }
        );

        if (Object.keys(res.response).length === 0) {
            return {error: "Could not fetch games, is the users profile public?"};
        }

        return res.response.games;
    } catch (error: any) {
        console.error(error);

        if (error.status == 403) {
            return {error: "Invalid API key set in environment file"};
        }

        if (error.status == 400) {
            return {error: "No API key set in environment file"};
        }

        return {error: "An unknown error occurred while trying to fetch owned games"};
    }
});
