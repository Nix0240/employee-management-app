import React, { useState } from "react";
import { Button, Typography, Container, Paper } from "@mui/material";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import { Employee } from "./types/employee";

const App: React.FC = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const openForm = (employee?: Employee) => {
    setEditingEmployee(employee || null);
    setFormOpen(true);
  };

  const closeForm = () => setFormOpen(false);

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Employee Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => openForm()}
          sx={{ marginBottom: 2 }}
        >
          Add Employee
        </Button>

        <EmployeeList />

        {isFormOpen && (
          <EmployeeForm
            existingEmployee={editingEmployee}
            onClose={closeForm}
          />
        )}
      </Paper>
    </Container>
  );
};

export default App;
