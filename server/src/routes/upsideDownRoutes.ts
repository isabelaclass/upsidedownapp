import express, { Request, Response } from "express"
import UpsideDownController from "../controllers/UpsideDownController";

//a rota faz a verificação de caminho

const router = express.Router()
const controller = new UpsideDownController()

router.post("/create", async (req: Request, res: Response) => {
  const response = await controller.create(req.body)

  return res.status(response === "Ok" ? 200 : 400).send(response)
})

router.get("/getAll", async (req: Request, res: Response) => {
  const response = await controller.all()

  return res.status(response.error ? 400 : 200).send(response)
})

router.patch("/update/:id", async (req: Request, res: Response) => {
  const response = await controller.update(req.params.id, req.body)

  return res.status(response.error ? 400 : 200).send(response)
})

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const response = await controller.delete(req.params.id)

  return res.status(response.error ? 400 : 200).send(response)
})

router.get("/queryPersonagem/:name", async (req: Request, res: Response) => {
  const response = await controller.query(req.params.name, req.body)

  return res.status(response.error ? 400 : 200).send(response)
})

router.get("/getExperience/:id/:name", async (req: Request, res: Response) => {
  const { id, name } = req.params;
  const response = await controller.getExperience(id, name);

  return res.status(response.error ? 400 : 200).send(response);
});

router.get("/getIdade/:id/:idade", async (req: Request, res: Response) => {
  const { id, idade } = req.params;
  const response = await controller.getExperience(id, idade);

  return res.status(response.error ? 400 : 200).send(response);
});

export default router;