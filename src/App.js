import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginAdmin from "./components/auth/LoginAdmin";
import AdminLayout from "./layouts/admin/AdminLayout";
import UserLayout from "./layouts/user/UserLayout";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import LoginUser from "./components/auth/LoginUser";

function App() {
  return (
    <SnackbarProvider
      autoHideDuration={2000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Router>
        <div>
          <Switch>
            <Route path="/loginAdmin/" component={LoginAdmin} />
            <Route path="/login">
              <LoginUser />
            </Route>
            <Route path="/admin/" component={AdminLayout} />
            <Route path="/" component={UserLayout} />
          </Switch>
        </div>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
