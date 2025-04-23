export class Task {
  id: number;
  title: string;
  description: string;
  colour: string;
  status: string;
  deadline: string;

  constructor(id: number, title: string, description: string, colour: string, status: string, deadline: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.colour = colour;
    this.status = status;
    this.deadline = deadline;
  }
}
