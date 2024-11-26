import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Employee {
  id: string;
  name: string;
  position: string;
  email: string;
}

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
};

export const fetchEmployees = createAsyncThunk("employees/fetch", async () => {
  const response = await fetch("/api/employees");
  return (await response.json()).employees;
});

export const addEmployee = createAsyncThunk("employees/add", async (employee: Omit<Employee, "id">) => {
  const response = await fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  return (await response.json()).employee; 
});

export const updateEmployee = createAsyncThunk("employees/update", async (employee: Employee) => {
  const response = await fetch(`/api/employees/${employee.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  return (await response.json()).employee; 
});

export const deleteEmployee = createAsyncThunk("employees/delete", async (id: string) => {
  await fetch(`/api/employees/${id}`, { method: "DELETE" });
  return id;
});

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, { payload }) => {
        state.employees = payload;
        state.loading = false;
      })
      .addCase(addEmployee.fulfilled, (state, { payload }) => {
        state.employees.push(payload);
      })
      .addCase(updateEmployee.fulfilled, (state, { payload }) => {
        const index = state.employees.findIndex((e) => e.id === payload.id);
        if (index !== -1) state.employees[index] = payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, { payload }) => {
        state.employees = state.employees.filter((e) => e.id !== payload);
      });
  },
});

export default employeeSlice.reducer;
