import { createServer, Model, Response } from "miragejs";

export function makeServer() {
  return createServer({
    models: {
      employee: Model.extend<
        Partial<{ id: string; name: string; position: string; email: string }>
      >({}),
    },

    seeds(server) {
      const employees = [
        {
          id: "1",
          name: "Arun Kumar",
          position: "Manager",
          email: "arun.kumar@example.com",
        },
        {
          id: "2",
          name: "Priya Sharma",
          position: "Developer",
          email: "priya.sharma@example.com",
        },
        {
          id: "3",
          name: "Rajesh Patel",
          position: "Designer",
          email: "rajesh.patel@example.com",
        },
        {
          id: "4",
          name: "Sneha Gupta",
          position: "Tester",
          email: "sneha.gupta@example.com",
        },
        {
          id: "5",
          name: "Amit Verma",
          position: "Developer",
          email: "amit.verma@example.com",
        },
        {
          id: "6",
          name: "Rani Mehta",
          position: "Manager",
          email: "rani.mehta@example.com",
        },
        {
          id: "7",
          name: "Vijay Yadav",
          position: "Developer",
          email: "vijay.yadav@example.com",
        },
        {
          id: "8",
          name: "Anjali Singh",
          position: "Designer",
          email: "anjali.singh@example.com",
        },
        {
          id: "9",
          name: "Suresh Iyer",
          position: "Tester",
          email: "suresh.iyer@example.com",
        },
        {
          id: "10",
          name: "Neha Agarwal",
          position: "Developer",
          email: "neha.agarwal@example.com",
        },
      ];

      employees.forEach((employee) => {
        server.create("employee", employee);
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/employees", (schema) => schema.all("employee"));

      this.post("/employees", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        console.log("Added");
        return schema.create("employee", attrs);
      });

      this.put("/employees/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const employee = schema.find("employee", id);

        if (employee) {
          employee.update(attrs);
          return new Response(200, {}, { employee });
        } else {
          return new Response(404, {}, { error: "Employee not found" });
        }
      });

      this.delete("/employees/:id", (schema, request) => {
        const id = request.params.id;
        const employee = schema.find("employee", id);

        if (employee) {
          employee.destroy();
          return new Response(204);
        } else {
          return new Response(404, {}, { error: "Employee not found" });
        }
      });
    },
  });
}
