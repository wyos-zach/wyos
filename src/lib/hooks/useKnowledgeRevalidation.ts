import { useMutation } from '@tanstack/react-query';

export function useKnowledgeRevalidation() {
  return useMutation({
    mutationFn: async (tags: string[]) => {
      const responses = await Promise.all(
        tags.map((tag) =>
          fetch(`/api/revalidate?tag=${encodeURIComponent(tag)}`)
        )
      );
      return responses.every((res) => res.ok);
    },
  });
}
