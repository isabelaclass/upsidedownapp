import { Body, Delete, Get, Patch, Post, Put, Route } from "tsoa";
import { UpsideDownModel } from "../model/UpsideDown";
import { JsonObject } from "swagger-ui-express";

//a controller faz a verificação do dado, se é válido ou não

interface UpsideDown {
  name: string;
  email: string;
  character: string;
  age: string;
  experience: string;
}

@Route("api/upsideDown")
export default class UpsideDownController {
  list: UpsideDown[] = [
    {
      name: "joao",
      email: "joao@gmail.com",
      character: "eleven",
      age: "21",
      experience: "baixo",
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
      character: string;
      age: string;
      experience: string;
    }
  ): Promise<String> {
    const data = new UpsideDownModel({
      name: body.name,
      email: body.email,
      character: body.character,
      age: body.age,
      experience: body.experience,
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
      character: string;
      age: string;
      experience: string;
    }
  ): Promise<JsonObject> {
    try {
      const result = await UpsideDownModel.findByIdAndUpdate(id, {
        name: body.name,
        email: body.email,
        character: body.character,
        age: body.age,
        experience: body.experience,
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

  @Get("/queryCharacter/:character")
  public async query(
    character: string,
  ): Promise<JsonObject> {
    try {
      const data = await UpsideDownModel.find({ character }).select(
        "character -_id"
      );
      return data;
    } catch (error: any) {
      return {
        error: error.mesage,
      };
    }
  }

  @Get("/getName/:name")
  public async queryName(
    name: string,
  ): Promise<JsonObject> {
    try {
      const data = await UpsideDownModel.find({ name }).select(
        "name -_id"
      );
      return data;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Get("/getExperience/:experience")
  public async queryExperience(
    experience: string,
  ): Promise<JsonObject> {
    try {
      const data = await UpsideDownModel.find({ experience }).select(
        "experience -_id"
      );
      return data;
    } catch (error: any) {
      return {
        error: error.mesage,
      };
    }
  }

  @Get("/getAge/:age")
  public async queryAge(
    age: string,
  ): Promise<JsonObject> {
    try {
      const data = await UpsideDownModel.find({ age }).select(
        "age -_id"
      );
      return data;
    } catch (error: any) {
      return {
        error: error.mesage,
      };
    }
  }
}
