import { Body, Delete, Get, Patch, Post, Put, Route } from "tsoa";
import { UpsideDownModel } from "../model/UpsideDown";
import { JsonObject } from "swagger-ui-express";

//a controller faz a verificação do dado, se é válido ou não

interface UpsideDown {
  name: string;
  email: string;
  personagem: string;
  idade: string;
  experiencia: string;
}

@Route("api/upsideDown")
export default class UpsideDownController {
  list : UpsideDown[] = [
    {
      name: "joao",
      email: "joao@gmail.com",
      personagem: "eleven",
      idade: "21",
      experiencia: "low"
    }
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
  public async create(@Body() body: {name: string, email: string, personagem: string, idade: string, experiencia: string}): Promise<String> {
    const data = new UpsideDownModel({
      name: body.name,
      email: body.email,
      personagem: body.personagem,
      idade: body.idade,
      experiencia: body.experiencia
    })

    try {
      await data.save()
      return "Ok"
    } catch (error) {
      return JSON.stringify(error)
    }
  }

  @Patch("/update/:id")
  public async update(id: string, @Body() body: { name: string, email:string, personagem: string, idade: string, experiencia: string }): Promise<JsonObject> {
    try {
      const result = await UpsideDownModel.findByIdAndUpdate( 
       id, { 
        name: body.name, 
        email: body.email, 
        personagem: body.personagem,
        idade: body.idade,
        experiencia: body.experiencia 
      }
      );

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
      const data = await UpsideDownModel.findByIdAndDelete(id);
      return { data: data };
    } catch (error: any) {
      return {
        error: error.message
      };
    }
  }

}