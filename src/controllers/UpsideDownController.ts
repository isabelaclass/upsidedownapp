import { Body, Delete, Get, Patch, Post, Put, Route } from "tsoa";
import { UpsideDownModel } from "../model/UpsideDown";
import { JsonObject } from "swagger-ui-express";

//a controller faz a verificação do dado, se é válido ou não

interface UpsideDown {
  id: number;
  name: string;
  email: string;
}

@Route("api/upsideDown")
export default class UpsideDownController {
  list : UpsideDown[] = [
    {
      id: 0,
      name: "Ana",
      email: "ana@gmail.com"
    },
    {
      id: 1,
      name: "joao",
      email: "joao@gmail.com"
    },
  ];

  @Get("/getAll")
  public async all(): Promise<JsonObject> {
    try {
      const data = await UpsideDownModel.find();
      return data;
    }
    catch (error: any) {
      return {
        error: error.message
      };
    }
  }


  @Post("/create")
  public async create(@Body() body: {name: string, email: string}): Promise<String> {
    const data = new UpsideDownModel({
      name: body.name,
      email: body.email
    })

    try {
      await data.save()
      return "oks"
    } catch (error) {
      return JSON.stringify(error)
    }
  }

  @Patch("/update/:id")
  public async update(@Body() body: { name: string, email:string }): Promise<JsonObject> {
    try {
      const result = await UpsideDownModel.findByIdAndUpdate(
        { name: body.name, email: body.email }
      )

      return { result: result };
    } catch (error: any) {
      return {
        error: error.message
      };
    }
  }

  @Delete("/delete/:id")
  public async delete(id: string): Promise<JsonObject> {
    try {
      const data = await UpsideDownModel.findByIdAndDelete(id)
      return { data: data };
    } catch (error: any) {
      return {
        error: error.message
      };
    }
  }

}