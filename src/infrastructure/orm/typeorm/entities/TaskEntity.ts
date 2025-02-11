import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("increment") // Auto-incremental unique ID
  id!: number;

  @Column({ type: "text" }) // Changed to text type
  title!: string;

  @Column({ type: "text", nullable: true }) // Changed to text type
  description?: string;

  @Column({  type: "datetime" ,nullable: true }) // Stored as text to maintain flexibility
  dueDate?: Date;
}
