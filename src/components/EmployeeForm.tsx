import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addEmployee,
  updateEmployee,
  Employee,
} from "../redux/slices/employeeSlice";
import { AppDispatch } from "../redux/store";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import "../styles/styles.css";

interface Props {
  existingEmployee?: Employee | null;
  onClose: () => void;
}

const EmployeeForm: React.FC<Props> = ({ existingEmployee, onClose }) => {
  const [formData, setFormData] = useState<Omit<Employee, "id">>({
    name: "",
    position: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    position: false,
    email: false,
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (existingEmployee) {
      setFormData({
        name: existingEmployee.name,
        position: existingEmployee.position,
        email: existingEmployee.email,
      });
    } else {
      setFormData({ name: "", position: "", email: "" });
    }
  }, [existingEmployee]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: !formData.name.trim(),
      position: !formData.position.trim(),
      email: !formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email),
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) return;

    if (existingEmployee) {
      dispatch(updateEmployee({ ...existingEmployee, ...formData }));
    } else {
      dispatch(addEmployee(formData));
    }

    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>
        {existingEmployee ? "Edit Employee" : "Add Employee"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            error={errors.name}
            helperText={errors.name ? "Name is required" : ""}
          />
          <TextField
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            error={errors.position}
            helperText={errors.position ? "Position is required" : ""}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            required
            margin="normal"
            error={errors.email}
            helperText={errors.email ? "Valid email is required" : ""}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary" onClick={handleSubmit}>
          {existingEmployee ? "Update Employee" : "Add Employee"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeForm;
