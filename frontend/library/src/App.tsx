import { Menubar, MenubarContent, MenubarGroup, MenubarItem, MenubarMenu, MenubarTrigger } from "#components/ui/menubar";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthUser } from "./features/users/hooks/fetchUser.hook";
import { isAuthenticated } from "./features/users/api/user.api";
import { queryClient } from "./lib/query-client";
import { AdminPanel } from "./features/users/page/adminPanel.modal";
import { User } from "lucide-react";
import { SearchBar } from "./components/ui/searchBar";

function App() {
  const { data: user, isPending } = useAuthUser()
  const navigate = useNavigate()
  const { isToken } = isAuthenticated()


  function handleLogoff() {
    localStorage.removeItem("token");

    queryClient.clear();

    navigate("/login");
  }

  if (isPending || !user) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <header className="w-full border-b border-(--border-color) bg-(--site-bg)">
        <Menubar className="h-14 w-full rounded-none border-0 bg-transparent px-4">
          <MenubarMenu>
            <div className="flex w-full items-center gap-5">
              <h1>Library</h1>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex h-14 items-center border-b-2 px-1 text-sm font-medium transition-colors ${isActive
                    ? "border-(--primary-accent) text-(--text-main)"
                    : "border-transparent text-(--text-secondary) hover:text-(--text-main)"
                  }`
                }
              >
                Home
              </NavLink>

              <MenubarItem className="h-full border-0 bg-transparent p-0">
                <NavLink
                  to="/category"
                  className={({ isActive }) =>
                    `flex h-14 items-center border-b-2 px-1 text-sm font-medium transition-colors ${isActive
                      ? "border-(--primary-accent) text-(--text-main)"
                      : "border-transparent text-(--text-secondary) hover:text-(--text-main)"
                    }`
                  }
                >
                  Categories
                </NavLink>
              </MenubarItem>
              <MenubarItem className="border-0 bg-transparent p-0">
                <NavLink
                  to="/authors"
                  className={({ isActive }) =>
                    `flex h-14 items-center border-b-2 px-1 text-sm font-medium transition-colors ${isActive
                      ? "border-(--primary-accent) text-(--text-main)"
                      : "border-transparent text-(--text-secondary) hover:text-(--text-main)"
                    }`
                  }
                >
                  Authors
                </NavLink>
              </MenubarItem>

              <MenubarItem className="border-0 bg-transparent p-0">
                <NavLink
                  to="/books"
                  className={({ isActive }) =>
                    `flex h-14 items-center border-b-2 px-1 text-sm font-medium transition-colors ${isActive
                      ? "border-(--primary-accent) text-(--text-main)"
                      : "border-transparent text-(--text-secondary) hover:text-(--text-main)"
                    }`
                  }
                >
                  Books
                </NavLink>
              </MenubarItem>

              <MenubarItem>
                {user?.role?.includes("admin") &&
                  <span>
                    <AdminPanel />
                  </span>
                }
              </MenubarItem>

              <div className="ml-auto flex items-center gap-3">
                <div className="relative ml-auto w-64">
                  <div className="flex items-center"><SearchBar /></div>
                </div>

                <MenubarTrigger className="cursor-pointer"><User /></MenubarTrigger>
                <MenubarContent className="w-fit">
                  <MenubarGroup className="flex items-center gap-1">
                    {isToken ? (
                      <>
                        <MenubarItem className="p-0 focus:bg-transparent">
                          <NavLink
                            to={`/${user?.username}`}
                            className="block cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-(--surface-hover)"
                          >
                            User
                          </NavLink>
                        </MenubarItem>

                        <MenubarItem className="p-0 focus:bg-transparent">
                          <button
                            onClick={handleLogoff}
                            className="block cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-(--surface-hover)"
                          >
                            Log Out
                          </button>
                        </MenubarItem>
                      </>
                    ) : (
                      <>
                        <MenubarItem className="p-0 focus:bg-transparent">
                          <NavLink
                            to="/login"
                            className="block cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-(--surface-hover)"
                          >
                            Sign In
                          </NavLink>
                        </MenubarItem>

                        <MenubarItem className="p-0 focus:bg-transparent">
                          <NavLink
                            to="/register"
                            className="block cursor-pointer rounded-md px-3 py-2 text-sm hover:bg-(--surface-hover)"
                          >
                            Register
                          </NavLink>
                        </MenubarItem>
                      </>
                    )}
                  </MenubarGroup>
                </MenubarContent>
              </div>
            </div>
          </MenubarMenu>
        </Menubar>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;