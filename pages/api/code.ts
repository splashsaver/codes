import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/primsa";
import Pika from "pika-id";

const pika = new Pika([]);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const query = req.query;

    if (!query.code) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Please provide the code.",
        },
      });
    }

    try {
      // Get the code from the database
      const code = await prisma.betaCode.findFirst({
        where: {
          code: query.code as string,
        },
      });

      if (code) {
        const deletedCode = await prisma.betaCode.delete({
          where: {
            code: query.code as string,
          },
        });

        if (deletedCode) {
          return res.status(200).json({ valid: true });
        } else {
          return res.status(200).json({ valid: false });
        }
      } else {
        return res.status(200).json({ valid: false });
      }
    } catch (err) {
      console.log(err);

      return res.status(500).json({
        valid: false,
      });
    }
  } else if (req.method === "POST") {
    interface Body {
      password: string;
    }

    const body: Body = req.body;

    if (!body.password) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Please provide the password.",
        },
      });
    }

    if (body.password.trim() !== process.env.PASSWORD) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Incorrect password.",
        },
      });
    }

    const code = pika.genSnowflake();

    try {
      // Store the code in the database.
      const betaCode = await prisma.betaCode.create({
        data: {
          code: String(code),
        },
      });

      if (betaCode) {
        return res.status(200).send({ success: true, code: code });
      }
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
        error: {
          message: "Something went wrong.",
        },
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      method: req.method,
      error: {
        message: `${req.method} requests are not allowed.`,
      },
    });
  }
}
