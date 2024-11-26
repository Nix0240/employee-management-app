import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees, deleteEmployee, Employee } from "../redux/slices/employeeSlice";
import { RootState, AppDispatch } from "../redux/store";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import EmployeeForm from "./EmployeeForm";

const EmployeeList = () => {
  const { employees, loading } = useSelector((state: RootState) => state.employees);
  const dispatch = useDispatch<AppDispatch>();

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (loading) return <CircularProgress />;

  const handleViewClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewDialogOpen(true);
  };

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsViewDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div>
      {employees.length === 0 ? (
        <Typography variant="h6">No employees found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee: Employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleViewClick(employee)}
                      style={{ marginRight: "10px" }}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleEditClick(employee)}
                      style={{ marginRight: "10px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => dispatch(deleteEmployee(employee.id))}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={isViewDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent>
          {selectedEmployee ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Name: {selectedEmployee.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Position: {selectedEmployee.position}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">Email: {selectedEmployee.email}</Typography>
              </Grid>
            </Grid>
          ) : (
            <Typography variant="body1">No employee selected</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isEditDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <EmployeeForm existingEmployee={selectedEmployee} onClose={handleCloseDialog} />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
