import {defineEventHandler, getQuery} from "h3";

export default defineEventHandler(async (event) => {
    const steamID: number = <number>getQuery(event).steamID;
    const config = useRuntimeConfig();

    if (!steamID) {
        return {error: "No Steam ID provided"};
    }

    try {
        const res: any = await $fetch(
            `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/`,
            {
                params: {
                    key: config.steamApiKey,
                    steamids: steamID,
                },
            }
        );

        return res.response.players[0];
    } catch (error: any) {
        console.error(error);

        if (error.status == 403) {
            return {error: "Invalid API key set in environment file"};
        }

        if (error.status == 400) {
            return {error: "No API key set in environment file"};
        }

        return {error: "An unknown error occurred while trying to fetch player summaries"};
    }
});
