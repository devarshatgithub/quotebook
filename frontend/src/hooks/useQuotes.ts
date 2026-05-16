import { useQuery, useMutation } from "@tanstack/react-query";
import { quoteService } from "../service/quoteService";
import type { QuoteRequestModel } from "../model/quote";
import { qC } from "../main";

export const useQuotes = () => {
    return useQuery({
        queryKey: ['quotes'],
        queryFn: quoteService.getAll,
        staleTime: 1000 * 60 * 5,
        retry: false,
        refetchOnWindowFocus: false
    })
}

export const useQuote = (id: string) => {
    return useQuery({
        queryKey: ['quotes', id],
        queryFn: () => quoteService.getById(id),
        enabled: !!id,
        retry: false,
        refetchOnWindowFocus: false
    })
}

export const useRandomQuote = () => {
    return useQuery({
        queryKey: ['quotes', 'random'],
        queryFn: quoteService.getRandom,
        staleTime: Infinity,
        retry: false
    })
}

export const useEditQuote = ({id, req}: {id?: string, req: 'create' | 'delete' | 'update'}) => {
    return useMutation({
        mutationFn: (quote: QuoteRequestModel) => {
            switch (req) {
                case 'create':
                    return quoteService.create(quote)
                    break;
                case 'delete':
                    return quoteService.delete(id)
                    break;
                case 'update':
                    return quoteService.update(id, quote)
                    break;
            }
        },
        onSuccess: () => {
            qC.invalidateQueries({ queryKey: ['quotes'] })
        }
    })
}