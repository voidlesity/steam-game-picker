import {defineEventHandler, getQuery} from "h3";

export default defineEventHandler(async (event) => {
    const vanityurl: string = <string>getQuery(event).vanityurl;
    const config = useRuntimeConfig();

    if (!vanityurl) {
        return {error: "Invalid vanity URL"};
    }

    try {
        const res: any = await $fetch(
            `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/`,
            {
                params: {
                    key: config.steamApiKey,
                    vanityurl: vanityurl,
                },
            }
        );

        if (res.response.message == 'No match') {
            return {error: "No profile found with that name"};
        }

        return {steamid: res.response.steamid};
    } catch (error: any) {
        console.error(error);

        if (error.status == 403) {
            return {error: "Invalid API key set in environment file"};
        }

        if (error.status == 400) {
            return {error: "No API key set in environment file"};
        }

        return {error: "An unknown error occurred while trying to resolve the vanity URL"};
    }
});
