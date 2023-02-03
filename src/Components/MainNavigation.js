import React from "react";
import "./DataTable.css";
import classes from './Main.module.css';
//import './Main.css';
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";
function MainNavigation() {
  const token = useRouteLoaderData("root");
  return (
    //<div className="outer_div2">//className={classess.list}>
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}> 
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          {/*<li>
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Authentication
            </NavLink>
            </li>*/}
          <li>
            <NavLink
              to="/Live"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              LiveData
            </NavLink>
          </li>
          {!token && (
            <li>
              <NavLink
                to="/auth?mode=Login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Login
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
    // </div>
  );
}

export default MainNavigation;
