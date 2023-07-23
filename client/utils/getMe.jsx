import newRequest from "./newRequest";

const getMe = async () => {
    try {
        const authToken = localStorage.getItem("accessToken") || '';
        var authTokenClean = authToken.substring(1, authToken.length - 1);
        const response = await newRequest.get("/users/me", {
            headers: {
              Authorization: `Bearer ${authTokenClean}`,
            },
            });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
export default getMe;