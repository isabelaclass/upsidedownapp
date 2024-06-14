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
  list: UpsideDown[] = [
    {
      name: "joao",
      email: "joao@gmail.com",
      personagem: "eleven",
      idade: "21",
      experiencia: "low",
    },
  ];

  @Get("/getAll")
  public async all(): Promise<JsonObject> {
    try {
      const data = await UpsideDownModel.find();
      return data;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Post("/create")
  public async create(
    @Body()
    body: {
      name: string;
      email: string;
      personagem: string;
      idade: string;
      experiencia: string;
    }
  ): Promise<String> {
    const data = new UpsideDownModel({
      name: body.name,
      email: body.email,
      personagem: body.personagem,
      idade: body.idade,
      experiencia: body.experiencia,
    });

    try {
      await data.save();
      return "Ok";
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  @Patch("/update/:id")
  public async update(
    id: string,
    @Body()
    body: {
      name: string;
      email: string;
      personagem: string;
      idade: string;
      experiencia: string;
    }
  ): Promise<JsonObject> {
    try {
      const result = await UpsideDownModel.findByIdAndUpdate(id, {
        name: body.name,
        email: body.email,
        personagem: body.personagem,
        idade: body.idade,
        experiencia: body.experiencia,
      });

      return { result: result };
    } catch (error: any) {
      return {
        error: error.message,
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
        error: error.message,
      };
    }
  }

  @Get("/queryPersonagem/:name")
  public async query(
    name: string,
    @Body() body: { personagem: string }
  ): Promise<JsonObject> {
    try {
      const data = await UpsideDownModel.find({ name }).select(
        "personagem -_id"
      );
      return data;
    } catch (error: any) {
      return {
        error: error.mesage,
      };
    }
  }

  @Get("/getUser")
  public async getUser(email: string): Promise<JsonObject> {
    try {
      const data = await UpsideDownModel.findOne({ email });
      if (!data) {
        throw null;
      }
      return data;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Get("/getExperience/:id/:name")
  public async getExperience(id: string, name: string): Promise<JsonObject> {
    try {
      const user = await UpsideDownModel.findOne({ _id: id, name: name });

      if (!user) {
        return { error: "Usuário não encontrado." };
      }

      return { experience: user.experiencia };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  @Get("/getIdade/:id/:idade")
  public async getIdade(id: string, idade: string): Promise<JsonObject> {
    try {
      const user = await UpsideDownModel.findOne({ _id: id, idade: idade });

      if (!user) {
        return { error: "Idade não encontrada." };
      }

      return { idade: user.idade };
    } catch (error: any) {
      return { error: error.message };
    }
  }
}
