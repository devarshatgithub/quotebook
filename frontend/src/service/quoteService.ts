import type { QuoteModel, QuoteRequestModel } from "../model/quote";
import clientAPI from "./clientAPI";

export const quoteService = {
    getAll: async (): Promise<QuoteModel[]> => {
        return await clientAPI.get('/quotes')   
    },

    getRandom: async (): Promise<QuoteModel> => {
        return await clientAPI.get('/quotes/random')
    },

    getById: async (id: string): Promise<QuoteModel> => {
        return await clientAPI.get(`/quotes/${id}`)
    },
    
    create: async (quote: QuoteRequestModel): Promise<QuoteModel> => {
        return await clientAPI.post('/quotes', { ...quote })
    },

    update: async (id: string, quote: QuoteRequestModel): Promise<QuoteModel> => {
        return await clientAPI.put(`/quotes/${id}`, { ...quote })
    },

    delete: async (id: string): Promise<QuoteModel> => {
        return await clientAPI.delete(`/quotes/${id}`)
    },

}