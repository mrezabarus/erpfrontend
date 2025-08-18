import { IsNotEmpty } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    nama_project: string;

    @IsNotEmpty()
    description: string;
}