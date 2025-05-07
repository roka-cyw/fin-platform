import { toast } from 'sonner'

import { InferRequestType, InferResponseType } from 'hono'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { client } from '@/lib/hono'

// prettier-ignore
type ResponseType = InferResponseType<typeof client.api.categories['bulk-delete']['$post']>
// prettier-ignore
type RequestType = InferRequestType<typeof client.api.categories['bulk-delete']['$post']>['json']

export const useBulkDeelteCategories = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async json => {
      const response = await client.api.categories['bulk-delete']['$post']({ json })
      return await response.json()
    },
    onSuccess: () => {
      toast.success('Category deleted')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      // TODO: Invalidate summary
    },
    onError: () => {
      toast.error('Failed to delete categories')
    }
  })

  return mutation
}
