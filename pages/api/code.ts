import type { NextApiRequest, NextApiResponse } from "next";
import Pika from "pika-id";

const pika = new Pika([]);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return;
  }
  if (req.method === "POST") {
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

    return res.status(200).send({ success: true, code: code });
  }
}
