import { useQuery } from "rakkasjs";

export function useViewer() {
  const query = useQuery({
    queryKey: "viewer",
    queryFn: async (ctx) => {
      try {
        const user = ctx.locals?.pb?.authStore?.model;
        return { viewer: user, error: null };
      } catch (error: any) {
        return { viewer: null, error: error.message };
      }
    },
  });
  return query;
}
