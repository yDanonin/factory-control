import { signIn } from "@/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function formSubmit(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  const email = req.body.email;
  const password = req.body.password;
  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
      callbackUrl: `${window.location.origin}`
    });

    if (res.error) {
      // toast({
      //   title: `${res.error}`,
      //   status: "error",
      //   duration: 4000,
      //   isClosable: true,
      // });
      console.log("deu errado");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed" });
  }
}
