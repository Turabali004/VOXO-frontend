import api from "./axiosInstance"

export const tweetsApi = {
    createTweet: async (content: string, parentTweetId?: string) => {
        const response = await api.post("api/tweets", { content, parentTweetId })
        return response.data
    },
    getFeed: async () => {
        const response = await api.get("api/tweets/feed")
        return response.data.data
    },
    getTweetById: async (id: string) => {
        const response = await api.get(`api/tweets/getTweetById/${id}`)
        return response.data.data
    }
}