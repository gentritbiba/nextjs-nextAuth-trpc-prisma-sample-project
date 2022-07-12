import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }): { greeting: string, info: { date: Date } } {
      return {
        greeting: `Hello ${input?.text?.toUpperCase() ?? "world"}`,
        info: {
          date: new Date(),
        },
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  });
