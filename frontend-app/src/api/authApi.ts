import api from "./axios";

export const registerApi = async (username: string, email: string) => {
  try {
    const response = await api.post("/users", { username , email });

    if(response.status === 201){
        return response.data;
    }else{
        throw new Error(response.data.message || "Login failed");
    }
  } catch (error: any) {
    throw new Error(error.response.data.message || "Login failed");
  }
};


