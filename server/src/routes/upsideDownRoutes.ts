import express, { Request, Response } from "express";
import UpsideDownController from "../controllers/UpsideDownController";

//a rota faz a verificação de caminho

const router = express.Router()
const controller = new UpsideDownController()

router.get('/getAll', async (req: Request, res: Response) => {
    const response = await controller.all()
    return res.status(200).send(response)
})

router.get('/getError', async (req: Request, res: Response) => {
    return res.status(400).send("Erro!");
})

router.post('/create', async (req: Request, res: Response) => {
    const response = await controller.create(req.body)
    return res.status(200).send(response)
})

router.put('/update/:id', async (req: Request, res: Response) => {
    if (req.body.id < 0 || req.body.name == "") {
        res.status(404).send("Não encontrado!");
    }

    const response = await controller.update(req.body.id);

    if (response) {
        return res.status(200).send(response);
    }

    res.status(404).send("Não encontrado!");
})

router.delete('/delete/:id', async (req: Request, res: Response) => {
    const response = await controller.delete(req.body.id);

    if (response.body.id > -1) {
        return res.status(200).send("OK");
    }

    res.status(404).send("Não encontrado!");
})

export default router;