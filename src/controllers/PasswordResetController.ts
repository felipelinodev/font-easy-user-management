import { Request, Response } from "express";
import { z } from "zod";
import crypto from "crypto";
import prisma from "../lib/prisma";
import { generateHash } from "../services/security";
import { sendPasswordResetEmail } from "../services/email";
import 'dotenv/config';

const forgotPasswordSchema = z.object({
  email: z.email("Email inválido."),
});

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token é obrigatório."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
});

async function forgotPasswordController(req: Request, res: Response) {
  const parsed = forgotPasswordSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ errors: z.flattenError(parsed.error) });
  }

  const { email } = parsed.data;

  const user = await prisma.users.findUnique({ where: { email } });

  // Sempre retornamos sucesso para não revelar se o e-mail existe
  if (!user) {
    return res.status(200).json({
      message: "Se este e-mail estiver cadastrado, você receberá um link para redefinir sua senha.",
    });
  }

  // Gerar token aleatório
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");

  // Salvar token hasheado no banco com validade de 1 hora
  await prisma.users.update({
    where: { email },
    data: {
      reset_token: hashedToken,
      reset_token_expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hora
    },
  });

  // Enviar e-mail com o token bruto (o link usará o rawToken)
  try {
    await sendPasswordResetEmail(email, rawToken);
  } catch (error) {
    console.error("Erro ao enviar e-mail de redefinição:", error);
    return res.status(500).json({ error: "Erro ao enviar o e-mail. Tente novamente mais tarde." });
  }

  res.status(200).json({
    message: "Se este e-mail estiver cadastrado, você receberá um link para redefinir sua senha.",
  });
}

async function resetPasswordController(req: Request, res: Response) {
  const parsed = resetPasswordSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ errors: z.flattenError(parsed.error) });
  }

  const { token, password } = parsed.data;

  // Hash do token recebido para comparar com o armazenado
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await prisma.users.findFirst({
    where: {
      reset_token: hashedToken,
      reset_token_expires: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    return res.status(400).json({ error: "Token inválido ou expirado." });
  }

  // Atualizar senha e limpar token
  const hashedPassword = await generateHash(password);

  await prisma.users.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      reset_token: null,
      reset_token_expires: null,
    },
  });

  res.status(200).json({ message: "Senha redefinida com sucesso!" });
}

export { forgotPasswordController, resetPasswordController };
