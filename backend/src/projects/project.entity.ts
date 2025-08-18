import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectItems } from '../project_items/project_items.entity'; // <- disesuaikan

export enum ProjectStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

@Entity()
export class Project {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nama_project: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: ProjectStatus,
        default: ProjectStatus.OPEN,
    })

    status: ProjectStatus;

    @OneToMany(() => ProjectItems, (item) => item.project)
    items: ProjectItems[];
}
