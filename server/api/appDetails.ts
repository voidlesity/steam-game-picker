import {defineEventHandler, getQuery} from "h3";

export default defineEventHandler(async (event) => {
    const appId: number = <number>getQuery(event).appId;

    if (!appId) {
        return {error: "Invalid appId"};
    }

    try {
        const res: any = await $fetch(
            `https://store.steampowered.com/api/appdetails`,
            {
                params: {
                    appids: appId,
                },
            }
        );

        if (!res[appId] || !res[appId].success) {
            return {error: "App details not found"};
        }

        return res[appId].data;
    } catch (error: any) {
        console.error(error);
        return {error: "An error occurred while fetching app details"};
    }
});
