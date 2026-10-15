import { api } from "#lib/axios"

export async function login(email: string, password: string) {
  const { data } = await api.post("/user/login", {
    email,
    password,
  })

  return data
}
