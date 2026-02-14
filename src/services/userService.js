const BASE_URL = "http://localhost:2026/user"

export const addUserApi = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("API Error")
    }

    return await response.json()
  } catch (error) {
    console.error("Add user failed:", error)
    throw error
  }
}
export const searchUserApi = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error("Search API Error")
    }

    return await response.json()
  } catch (error) {
    console.error("Search user failed:", error)
    throw error
  }
}
