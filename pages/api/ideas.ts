import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import client from "@libs/server/client";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    const {
      body: { content },
      session: { user },
    } = req;
    const idea = await client.idea.create({
      data: {
        content,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      idea,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);