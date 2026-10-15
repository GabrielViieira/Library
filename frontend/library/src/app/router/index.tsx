import App from "../../App";
import { createBrowserRouter } from "react-router-dom"
import { LoginPage } from "../../features/auth/page/login.page";
import { RegisterPage } from "../../features/auth/page/register.page";
import { UserPage } from "../../features/users/page/user.page";
import { CategoryPage } from "../../features/categories/page/category.page";
import { BooksPage } from "../../features/books/page/books.page";
import { AuthorsPage } from "../../features/authors/page/author.page";
import { DashboardPage } from "../../features/dashboard/dashboard.page";
import { HomePage } from "../../features/index/page/index.page";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element:<HomePage/>
      },
      {
        path: "/:username",
        element: <UserPage />
      },
      {
        path: "/category",
        element: <CategoryPage />
      },
      {
        path: "/books/search",
        element: <BooksPage />
      },
      {
        path: "/authors",
        element: <AuthorsPage />
      },
      {
        path: "/books",
        element: <BooksPage />
      },
      {
        path: "/dashboard",
        element: <DashboardPage/>
      }
    ]
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },


])