import { IsEnum } from "class-validator";
import { ProjectStatus } from "../project.entity";

export class UpdateProjectStatusDto {
    @IsEnum(ProjectStatus,{
        message:"Status harus salah satu dari : OPEN, IN_PROGRESS dan DONE",
    })

    status: ProjectStatus;
}